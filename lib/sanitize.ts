import DOMPurify from 'dompurify';

/**
 * Sanitizes user input by stripping all HTML tags and attributes.
 * Use this for plain text fields like prompts, names, etc.
 *
 * @param input - The string to sanitize
 * @returns Sanitized string with all HTML removed
 *
 * @example
 * sanitizeInput('<script>alert("xss")</script>Hello') // Returns: 'Hello'
 * sanitizeInput('Normal text') // Returns: 'Normal text'
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [], // Strip all attributes
  });
};

/**
 * Sanitizes HTML content while allowing safe formatting tags.
 * Use this for rich text fields where basic formatting is needed.
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML with only safe tags preserved
 *
 * @example
 * sanitizeHTML('<p>Hello <script>alert(1)</script></p>') // Returns: '<p>Hello </p>'
 * sanitizeHTML('<b>Bold</b> text') // Returns: '<b>Bold</b> text'
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return '';

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'u', 'span'],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitizes an object's string values recursively.
 * Use this for CSV data or form objects with multiple fields.
 *
 * @param obj - The object to sanitize
 * @returns New object with all string values sanitized
 *
 * @example
 * sanitizeObject({ name: '<script>evil</script>John', age: 30 })
 * // Returns: { name: 'John', age: 30 }
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as any;
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as any;
    } else if (value && typeof value === 'object') {
      sanitized[key as keyof T] = sanitizeObject(value) as any;
    } else {
      sanitized[key as keyof T] = value;
    }
  }

  return sanitized;
};
