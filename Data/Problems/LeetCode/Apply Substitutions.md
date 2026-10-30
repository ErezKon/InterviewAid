# 3481. Apply Substitutions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-substitutions](https://leetcode.com/problems/apply-substitutions)
**Companies:** Google

---

## 1. Problem Description

You are given a `replacements` mapping and a `text` string that may contain **placeholders** formatted as `%var%`, where each `var` corresponds to a key in the `replacements` mapping. Each replacement value may itself contain **one or more** such **placeholders**. Each **placeholder** is replaced by the value associated with its corresponding replacement key.

Return the fully substituted `text` string which **does not** contain any **placeholders**.

**Constraints:**
- `1 ≤ replacements.length ≤ 10`
- Each element of `replacements` is a two-element list `[key, value]`, where:
  - `key` is a single uppercase English letter.
  - `value` is a non-empty string of at most 8 characters that may contain zero or more placeholders formatted as `%<key>%`.
- All replacement keys are unique.
- The `text` string is formed by concatenating all key placeholders (formatted as `%<key>%`) randomly from the replacements mapping, separated by underscores.
- `text.length == 4 * replacements.length - 1`
- Every placeholder in the `text` or in any replacement value corresponds to a key in the `replacements` mapping.
- There are no cyclic dependencies between replacement keys.

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

```
Example 1:
  Input: replacements = [["A","abc"],["B","def"]], text = "%A%_%B%"
  Output: "abc_def"
  Explanation:
  - The mapping associates "A" with "abc" and "B" with "def".
  - Replace %A% with "abc" and %B% with "def" in the text.
  - The final text becomes "abc_def".

Example 2:
  Input: replacements = [["A","bce"],["B","ace"],["C","abc%B%"]], text = "%A%_%B%_%C%"
  Output: "bce_ace_abcace"
  Explanation:
  - The mapping associates "A" with "bce", "B" with "ace", and "C" with "abc%B%".
  - Replace %A% with "bce" and %B% with "ace" in the text.
  - Then, for %C%, substitute %B% in "abc%B%" with "ace" to obtain "abcace".
  - The final text becomes "bce_ace_abcace".
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
