"""
Claude AI integration for code review
"""
import os
import json
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

# Initialize Anthropic client - moved inside functions to avoid initialization errors
def get_client():
    """Get Anthropic client instance"""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY not found in environment variables")
    return Anthropic(api_key=api_key)

SYSTEM_PROMPT = """You are an expert code reviewer with deep knowledge of software engineering best practices, security, and performance optimization.

Review the following {language} code and respond ONLY in this exact JSON format with no extra text, no markdown, no backticks:

{{
  "bugs": [
    {{
      "line": <int>,
      "severity": "critical|warning|info",
      "description": "<issue>",
      "fix": "<suggested fix>"
    }}
  ],
  "security": [
    {{
      "line": <int>,
      "issue": "<vulnerability>",
      "recommendation": "<fix>"
    }}
  ],
  "performance": [
    {{
      "line": <int>,
      "suggestion": "<optimization>"
    }}
  ],
  "quality": {{
    "score": <0-100>,
    "readability": "<comment>",
    "maintainability": "<comment>"
  }},
  "summary": "<2-3 sentence overall review>",
  "fixed_code": "<complete corrected version of the code>"
}}

Important guidelines:
- Line numbers should be 1-indexed (first line is 1)
- Severity must be exactly one of: critical, warning, info
- Quality score must be between 0-100
- fixed_code should contain the complete corrected code, not a diff
- If there are no issues in a category, return an empty array []
- Ensure the JSON is valid and parseable
"""

async def review_code_with_claude(code: str, language: str) -> dict:
    """
    Send code to Claude API for review and return structured response
    """
    try:
        # Get client instance
        client = get_client()
        
        # Prepare the prompt
        system_prompt = SYSTEM_PROMPT.format(language=language)
        user_message = f"Review this {language} code:\n\n```{language}\n{code}\n```"
        
        # Call Claude API
        message = client.messages.create(
            model="claude-sonnet-4-20250514",  # Latest Claude Sonnet 4
            max_tokens=4096,
            temperature=0.3,  # Lower temperature for more consistent output
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        # Extract response text
        response_text = message.content[0].text.strip()
        
        # Parse JSON response
        try:
            review_result = json.loads(response_text)
        except json.JSONDecodeError:
            # Try to extract JSON if wrapped in markdown or other text
            import re
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                review_result = json.loads(json_match.group())
            else:
                raise ValueError("Could not parse JSON from Claude response")
        
        return review_result
    
    except Exception as e:
        print(f"Error calling Claude API: {str(e)}")
        raise

async def review_code_streaming(code: str, language: str):
    """
    Stream code review from Claude API (for SSE support)
    """
    try:
        # Get client instance
        client = get_client()
        
        system_prompt = SYSTEM_PROMPT.format(language=language)
        user_message = f"Review this {language} code:\n\n```{language}\n{code}\n```"
        
        # Stream the response
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            temperature=0.3,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_message}
            ]
        ) as stream:
            for text in stream.text_stream:
                yield text
    
    except Exception as e:
        print(f"Error streaming from Claude API: {str(e)}")
        raise
