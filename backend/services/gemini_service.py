"""
Google Gemini AI integration for code review (FREE!) - New API
"""
import os
import json
from google import genai
from google.genai.types import GenerateContentConfig
from dotenv import load_dotenv

load_dotenv()

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are an expert code reviewer with deep knowledge of software engineering best practices, security, and performance optimization.

Review the following {language} code and respond ONLY in this exact JSON format with no extra text, no markdown, no backticks:

{{
  "bugs": [
    {{
      "line": 1,
      "severity": "critical",
      "description": "issue description",
      "fix": "suggested fix"
    }}
  ],
  "security": [
    {{
      "line": 1,
      "issue": "vulnerability description",
      "recommendation": "fix recommendation"
    }}
  ],
  "performance": [
    {{
      "line": 1,
      "suggestion": "optimization suggestion"
    }}
  ],
  "quality": {{
    "score": 75,
    "readability": "readability comment",
    "maintainability": "maintainability comment"
  }},
  "summary": "2-3 sentence overall review",
  "fixed_code": "complete corrected version of the code"
}}

Important: Return valid JSON only. If there are no issues in a category, return an empty array [].
"""

async def review_code_with_gemini(code: str, language: str) -> dict:
    """
    Send code to Gemini API for review and return structured response
    """
    # Prepare prompt
    system_prompt = SYSTEM_PROMPT.format(language=language)
    user_message = f"Review this {language} code:\n\n```{language}\n{code}\n```"
    full_prompt = f"{system_prompt}\n\n{user_message}"

    response_text = ""
    try:
        # Call Gemini API with new SDK (using gemini-2.5-flash - the latest free model)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=full_prompt,
            config=GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=4096,
            )
        )
        response_text = response.text.strip()
    except Exception as e:
        print(f"Error calling gemini-2.5-flash (might be overloaded): {str(e)}")
        print("Falling back to gemini-1.5-flash...")
        try:
            response = client.models.generate_content(
                model='gemini-1.5-flash',
                contents=full_prompt,
                config=GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=4096,
                )
            )
            response_text = response.text.strip()
        except Exception as fallback_error:
            print(f"Error calling gemini-1.5-flash fallback: {str(fallback_error)}")
            raise fallback_error
    
    # Parse JSON response
    try:
        # Remove markdown code blocks if present
        if '```json' in response_text:
            response_text = response_text.split('```json')[1].split('```')[0].strip()
        elif '```' in response_text:
            response_text = response_text.split('```')[1].split('```')[0].strip()
        
        review_result = json.loads(response_text)
    except json.JSONDecodeError:
        # Try to extract JSON if wrapped in other text
        import re
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            review_result = json.loads(json_match.group())
        else:
            raise ValueError("Could not parse JSON from Gemini response")
    
    return review_result

async def review_code_streaming(code: str, language: str):
    """
    Stream code review from Gemini API (for SSE support)
    """
    system_prompt = SYSTEM_PROMPT.format(language=language)
    user_message = f"Review this {language} code:\n\n```{language}\n{code}\n```"
    full_prompt = f"{system_prompt}\n\n{user_message}"
    
    try:
        # Stream the response (using gemini-2.5-flash - the latest free model)
        async for chunk in client.models.generate_content_stream(
            model='gemini-2.5-flash',
            contents=full_prompt,
            config=GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=4096,
            )
        ):
            if chunk.text:
                yield chunk.text
    except Exception as e:
        print(f"Streaming error with gemini-2.5-flash: {str(e)}. Falling back to gemini-1.5-flash...")
        try:
            async for chunk in client.models.generate_content_stream(
                model='gemini-1.5-flash',
                contents=full_prompt,
                config=GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=4096,
                )
            ):
                if chunk.text:
                    yield chunk.text
        except Exception as fallback_error:
            print(f"Streaming error with gemini-1.5-flash fallback: {str(fallback_error)}")
            raise fallback_error
