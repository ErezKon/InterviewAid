# 2759. Convert JSON String to Object

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/convert-json-string-to-object](https://leetcode.com/problems/convert-json-string-to-object)
**Companies:** Mongodb, Verizon

---

## 1. Problem Description

Given a string `str`, return parsed JSON `parsedStr`. You may assume the `str` is a valid JSON string hence it only includes strings, numbers, arrays, objects, booleans, and null. `str` will not include invisible characters and escape characters.

Please solve it without using the built-in `JSON.parse` method.

**Constraints:**
- `str` is a valid JSON string
- `1 <= str.length <= 10^5`

---

## 2. Approach: Recursive Descent Parser — O(n) ✅

```text
FUNCTION jsonParse(str):
    // Global index for current position
    SET i ← 0

    FUNCTION parseValue():
        CALL skipWhitespace()
        IF str[i] = '"':
            RETURN parseString()
        ELSE IF str[i] = '{':
            RETURN parseObject()
        ELSE IF str[i] = '[':
            RETURN parseArray()
        ELSE IF str[i] = 't':
            SET i ← i + 4
            RETURN true
        ELSE IF str[i] = 'f':
            SET i ← i + 5
            RETURN false
        ELSE IF str[i] = 'n':
            SET i ← i + 4
            RETURN null
        ELSE:
            RETURN parseNumber()

    FUNCTION parseString():
        SET i ← i + 1 // skip opening quote
        SET result ← ""
        WHILE str[i] ≠ '"':
            IF str[i] = '\\':
                SET i ← i + 1 // skip escape character
            SET result ← result + str[i]
            SET i ← i + 1
        SET i ← i + 1 // skip closing quote
        RETURN result

    // parseObject, parseArray, parseNumber omitted for brevity – they follow standard recursive descent patterns

    RETURN parseValue()
```

---

## 3. Examples

```
Example 1:
  Input: str = '{"a":2,"b":[1,2,3]}'
  Output: {"a":2,"b":[1,2,3]}
  Explanation: Returns the object represented by the JSON string.
```
```
Example 2:
  Input: str = 'true'
  Output: true
  Explanation: Primitive types are valid JSON.
```
```
Example 3:
  Input: str = '[1,5,"false",{"a":2}]'
  Output: [1,5,"false",{"a":2}]
  Explanation: Returns the array represented by the JSON string.
```

---

## 4. Walkthrough

1. Input string: `"{\"a\":1,\"b\":[true,false]}"`.
2. `parseValue` sees `{` → calls `parseObject`.
3. Inside `parseObject`, repeatedly:
   - `parseString` reads key `"a"` → `a`.
   - `parseValue` reads `1` → `parseNumber` returns `1`.
   - Next key `"b"` → `b`.
   - `parseValue` sees `[` → `parseArray` parses `true` and `false`.
4. Construct object `{ a: 1, b: [true, false] }` and return.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each character processed once | O(d) – recursion depth `d` equals nesting level |

---

## 6. Follow-Up Questions

- How would you extend the parser to support numbers with exponents and fractional parts?
- What changes are needed to handle whitespace variations more robustly?
- Could you implement the parser iteratively using an explicit stack instead of recursion?

---

## Key Takeaway

> A JSON parser is a classic recursive descent parser: dispatch on the first character (`"`, `{`, `[`, `t`, `f`, `n`, or digit) and recursively parse nested structures.
