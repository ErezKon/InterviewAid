# 3481. Apply Substitutions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-substitutions](https://leetcode.com/problems/apply-substitutions)
**Companies:** Google

---

## 1. Problem Description

Given a list of variable substitutions `[key, value]` and a text string, replace all occurrences of `%key%` in the text with the corresponding value. Values may themselves contain variable references, so apply substitutions recursively until no variables remain.

---

## 2. Key Insight

> Build a substitution map. Resolve each variable's final value via DFS/memoization (topological order). Then replace all `%key%` in the text.

---

## 3. Approach: Resolve + Replace — O(total chars) ✅

```text
FUNCTION applySubstitutions(replacements, text):
    varMap ← MAP from key to value for each (key, value) in replacements
    resolved ← EMPTY MAP
    
    FUNCTION resolve(key):
        IF key IN resolved: RETURN resolved[key]
        raw ← varMap[key]
        // replace any %inner% in raw recursively
        result ← REPLACE_ALL(raw, "%" + inner + "%", resolve(inner))
        resolved[key] ← result
        RETURN result
    
    // Resolve all variables
    FOR each key IN varMap:
        resolve(key)
    
    // Replace in the original text
    RETURN REPLACE_ALL(text, "%" + k + "%", resolved[k]) for each k in resolved
```

| Time | Space |
|------|-------|
| O(total characters across all values) | O(same) |

---

## Examples

**Example 1:**
```
Input: replacements = [["a", "b"], ["b", "c"]], text = "%a%"
Output: "c"
Explanation: Resolve "a" → "b", then "b" → "c". Final text is "c".
```

**Example 2:**
```
Input: replacements = [["x", "%y%"], ["y", "z"]], text = "%x% and %y%"
Output: "z and z"
Explanation: "%x%" resolves to "%y%" which resolves to "z".
```

---

## Walkthrough

1. Build `varMap`: {"a": "b", "b": "c"}.
2. Call `resolve("a")`:
   - Not in `resolved`, raw = "b".
   - No inner `%` patterns, so result = "b".
   - Store `resolved["a"] = "b"`.
3. Call `resolve("b")`:
   - raw = "c", result = "c".
   - Store `resolved["b"] = "c"`.
4. Replace in text "%a%": find key "a", substitute with `resolved["a"]` = "b".
5. Since "b" still contains a variable, repeat replacement using `resolved["b"]` = "c" → final "c".

---

## Complexity Analysis

- **Time:** O(T) where T is total length of all replacement strings plus the input text, because each character is processed a constant number of times during resolution and final replacement.
- **Space:** O(V) for storing the resolved values of V variables.

---

## Follow-Up Questions

1. How would you detect and handle cyclic substitutions?
2. Can the algorithm be adapted to perform substitutions in a streaming fashion for very large texts?
3. What changes are needed if the substitution syntax uses a different delimiter, e.g., `${key}`?

---

## Key Takeaway

> Recursive variable resolution with memoization handles nested substitutions. Topological ordering ensures each variable is resolved exactly once.
