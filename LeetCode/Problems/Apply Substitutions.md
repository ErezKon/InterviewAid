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

```
FUNCTION applySubstitutions(replacements, text):
    varMap = {key: value for key, value in replacements}
    resolved = {}
    
    FUNCTION resolve(key):
        IF key IN resolved: RETURN resolved[key]
        val = varMap[key]
        result = replace all %x% in val with resolve(x)
        resolved[key] = result
        RETURN result
    
    // resolve all variables
    FOR key IN varMap:
        resolve(key)
    
    // replace in text
    RETURN replace all %key% in text with resolved[key]
```

| Time | Space |
|------|-------|
| O(total characters across all values) | O(same) |

---

## Key Takeaway

> Recursive variable resolution with memoization handles nested substitutions. Topological ordering ensures each variable is resolved exactly once.
