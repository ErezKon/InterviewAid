# 2633. Convert Object to JSON String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-object-to-json-string](https://leetcode.com/problems/convert-object-to-json-string)
**Companies:** Apple, Google

---

## 1. Problem Description

Implement `JSON.stringify` — convert a JavaScript object/value into a JSON string without using the built-in method. *(JavaScript problem)*

---

## 2. Approach: Recursive Serialization — O(n) ✅

```text
FUNCTION jsonStringify(value):
    IF value IS null:
        RETURN "null"
    ELSE IF TYPEOF value IS boolean OR number:
        RETURN STRING(value)
    ELSE IF TYPEOF value IS string:
        RETURN '"' + value + '"'
    ELSE IF IS_ARRAY(value):
        SET parts ← []
        FOR element IN value:
            APPEND jsonStringify(element) TO parts
        RETURN "[" + JOIN(",", parts) + "]"
    ELSE: // object
        SET pairs ← []
        FOR key IN OBJECT_KEYS(value):
            SET serializedKey ← '"' + key + '"'
            SET serializedVal ← jsonStringify(value[key])
            APPEND serializedKey + ":" + serializedVal TO pairs
        RETURN "{" + JOIN(",", pairs) + "}"
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `{ a: 1, b: [true, false], c: null }` | `"{\"a\":1,\"b\":[true,false],\"c\":null}"` |
| `["x", { y: 2 }]` | `"[\"x\",{\"y\":2}]"` |

---

## 4. Walkthrough

1. Input object `{ a: 1, b: [true, false], c: null }`.
2. `jsonStringify` sees an object → iterate keys.
   - Key `a`: value `1` → serialize to `1`.
   - Key `b`: value is array → serialize each element `true` → `true`, `false` → `false`; join → `[true,false]`.
   - Key `c`: value `null` → `null`.
3. Combine pairs: `"a":1`, `"b":[true,false]`, `"c":null`.
4. Join with commas and wrap with `{}` → `"{\"a\":1,\"b\":[true,false],\"c\":null}"`.
5. Return the JSON string.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each element visited once | O(d) – recursion depth `d` equals nesting level |

---

## 6. Follow-Up Questions

- How would you handle circular references in the object?
- Can you extend the serializer to format output with indentation?
- What changes are needed to support `BigInt` or `undefined` values?

---

## Key Takeaway

> Dispatch on type: null, boolean, number, string, array, or object. Recursively serialize children. Arrays use `[]` with comma‑separated values; objects use `{}` with `"key":value` pairs.
