# 2633. Convert Object to JSON String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-object-to-json-string](https://leetcode.com/problems/convert-object-to-json-string)
**Companies:** Apple, Google

---

## 1. Problem Description

Given a value, return a valid JSON string of that value. The value can be a string, number, array, object, boolean, or null. The returned string should not include extra spaces. The order of keys should be the same as the order returned by `Object.keys()`.

Please solve it without using the built-in `JSON.stringify` method.

**Constraints:**
- `value` is a valid JSON value
- `1 <= JSON.stringify(object).length <= 10^5`
- `maxNestingLevel <= 1000`
- all strings contain only alphanumeric characters

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

```
Example 1:
  Input: object = {"y":1,"x":2}
  Output: {"y":1,"x":2}
  Explanation:
    Return the JSON representation.
    Note that the order of keys should be the same as the order returned by Object.keys().
```
```
Example 2:
  Input: object = {"a":"str","b":-12,"c":true,"d":null}
  Output: {"a":"str","b":-12,"c":true,"d":null}
  Explanation:
    The primitives of JSON are strings, numbers, booleans, and null.
```
```
Example 3:
  Input: object = {"key":{"a":1,"b":[{},null,"Hello"]}}
  Output: {"key":{"a":1,"b":[{},null,"Hello"]}}
  Explanation:
    Objects and arrays can include other objects and arrays.
```
```
Example 4:
  Input: object = true
  Output: true
  Explanation:
    Primitive types are valid inputs.
```

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
