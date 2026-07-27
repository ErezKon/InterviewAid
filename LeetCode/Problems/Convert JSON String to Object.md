# 2759. Convert JSON String to Object

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/convert-json-string-to-object](https://leetcode.com/problems/convert-json-string-to-object)
**Companies:** Mongodb, Verizon

---

## 1. Problem Description

Implement a JSON parser that converts a JSON string into a JavaScript object/value without using `JSON.parse`. *(JavaScript problem)*

---

## 2. Approach: Recursive Descent Parser — O(n) ✅

```javascript
function jsonParse(str) {
    let i = 0;
    
    function parseValue() {
        skipWhitespace();
        if (str[i] === '"') return parseString();
        if (str[i] === '{') return parseObject();
        if (str[i] === '[') return parseArray();
        if (str[i] === 't') { i += 4; return true; }
        if (str[i] === 'f') { i += 5; return false; }
        if (str[i] === 'n') { i += 4; return null; }
        return parseNumber();
    }
    
    function parseString() {
        i++; // skip opening "
        let result = "";
        while (str[i] !== '"') {
            if (str[i] === '\\') { i++; /* handle escapes */ }
            result += str[i++];
        }
        i++; // skip closing "
        return result;
    }
    
    function parseObject() { /* parse key:value pairs */ }
    function parseArray()  { /* parse comma-separated values */ }
    function parseNumber() { /* parse digits, sign, decimal, exponent */ }
    
    return parseValue();
}
```

| Time | Space |
|------|-------|
| O(n) | O(depth) recursion |

---

## Key Takeaway

> A JSON parser is a classic recursive descent parser: dispatch on the first character (`"`, `{`, `[`, `t`, `f`, `n`, or digit) and recursively parse nested structures.
