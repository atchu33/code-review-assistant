"""
Language detection and code parsing utilities
"""

# Language extensions mapping
LANGUAGE_EXTENSIONS = {
    'python': ['.py'],
    'javascript': ['.js', '.jsx', '.mjs'],
    'typescript': ['.ts', '.tsx'],
    'java': ['.java'],
    'csharp': ['.cs'],
    'cpp': ['.cpp', '.cc', '.cxx', '.h', '.hpp'],
    'c': ['.c', '.h'],
    'go': ['.go'],
    'rust': ['.rs'],
    'php': ['.php'],
    'ruby': ['.rb'],
    'swift': ['.swift'],
    'kotlin': ['.kt', '.kts'],
    'scala': ['.scala'],
    'r': ['.r', '.R'],
    'sql': ['.sql'],
    'html': ['.html', '.htm'],
    'css': ['.css', '.scss', '.sass'],
    'shell': ['.sh', '.bash'],
}

# Language keywords for detection
LANGUAGE_KEYWORDS = {
    'python': ['def ', 'import ', 'from ', 'class ', '__init__', 'self.', 'elif ', 'print('],
    'javascript': ['function ', 'const ', 'let ', 'var ', '=>', 'console.log', 'require(', 'import '],
    'typescript': ['interface ', 'type ', ': string', ': number', 'const ', 'function ', '=>'],
    'java': ['public class', 'private ', 'protected ', 'void ', 'System.out', 'import java.'],
    'csharp': ['namespace ', 'using ', 'public class', 'private ', 'void ', 'Console.'],
    'cpp': ['#include', 'std::', 'cout', 'cin', 'namespace ', 'template<'],
    'c': ['#include', 'int main', 'printf', 'scanf', 'struct '],
    'go': ['package ', 'func ', 'import ', 'type ', 'var ', 'fmt.Print'],
    'rust': ['fn ', 'let ', 'mut ', 'impl ', 'use ', 'println!'],
    'php': ['<?php', 'function ', '$', 'echo ', 'namespace '],
    'ruby': ['def ', 'end', 'class ', 'require ', 'puts ', '@'],
    'swift': ['func ', 'var ', 'let ', 'import ', 'class ', 'struct '],
    'kotlin': ['fun ', 'val ', 'var ', 'class ', 'object ', 'companion'],
    'sql': ['SELECT ', 'FROM ', 'WHERE ', 'INSERT ', 'UPDATE ', 'DELETE ', 'CREATE TABLE'],
    'html': ['<!DOCTYPE', '<html', '<div', '<head', '<body'],
    'css': ['{', '}', ':', ';', 'px', 'color:', 'background:'],
}

def detect_language(code: str, filename: str = None) -> str:
    """
    Detect programming language from code content or filename
    """
    # Try to detect from filename extension
    if filename:
        for lang, extensions in LANGUAGE_EXTENSIONS.items():
            if any(filename.lower().endswith(ext) for ext in extensions):
                return lang
    
    # Detect from code content
    code_lower = code.lower()
    keyword_matches = {}
    
    for lang, keywords in LANGUAGE_KEYWORDS.items():
        matches = sum(1 for keyword in keywords if keyword.lower() in code_lower)
        if matches > 0:
            keyword_matches[lang] = matches
    
    # Return language with most keyword matches
    if keyword_matches:
        return max(keyword_matches, key=keyword_matches.get)
    
    # Default fallback
    return 'plaintext'

def validate_code(code: str) -> bool:
    """
    Basic validation to ensure code is not empty or too large
    """
    if not code or len(code.strip()) == 0:
        return False
    
    # Limit to 50KB per request
    if len(code) > 50000:
        return False
    
    return True

def count_lines(code: str) -> int:
    """
    Count number of lines in code
    """
    return len(code.split('\n'))
