# 3039. Apply Operations to Make String Empty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-string-empty](https://leetcode.com/problems/apply-operations-to-make-string-empty)
**Companies:** Virtusa

---

## 1. Problem Description

You are given a string `s`.

Consider performing the following operation until `s` becomes **empty**:

- For **every** alphabet character from `'a'` to `'z'`, remove the **first** occurrence of that character in `s` (if it exists).

For example, let initially `s = "aabcbbca"`. We do the following operations:

- Remove the underlined characters `s = "aabcbbca"` (the first `a`, `b`, and `c`). The resulting string is `s = "abbca"`.
- Remove the underlined characters `s = "abbca"` (the first `a`, `b`, and `c`). The resulting string is `s = "ba"`.
- Remove the underlined characters `s = "ba"`. The resulting string is `s = ""`.

Return *the value of the string* `s` *right **before** applying the **last** operation*. In the example above, answer is `"ba"`.

**Constraints:**
- `1 ≤ s.length ≤ 5 × 10⁵`
- `s` consists only of lowercase English letters.

---

## 2. Key Insight

> Characters with the maximum frequency survive the longest. The last non-empty string consists of the **last occurrence** of each character that has the maximum frequency, in their original order.

---

## 3. Approach: Frequency + Last Occurrence — O(n) ✅

```text
FUNCTION lastNonEmptyString(s):
    // Count frequency of each character
    freq ← MAP of character → integer
    FOR ch IN s:
        INCREMENT freq[ch]
    END FOR
    maxFreq ← MAX value in freq
    // Record last index of each character
    lastIdx ← MAP of character → integer
    FOR i FROM 0 TO LENGTH(s)-1:
        lastIdx[s[i]] ← i
    END FOR
    // Collect characters with max frequency, ordered by last occurrence
    candidates ← []
    FOR ch, count IN freq:
        IF count = maxFreq:
            APPEND (ch, lastIdx[ch]) TO candidates
        END IF
    END FOR
    SORT candidates BY second element (last index) ASCENDING
    result ← ""
    FOR (ch, _) IN candidates:
        CONCATENATE ch TO result
    END FOR
    RETURN result
```

---

## Examples

```
Example 1:
  Input: s = "aabcbbca"
  Output: "ba"
  Explanation: Explained in the statement.

Example 2:
  Input: s = "abcd"
  Output: "abcd"
  Explanation: We do the following operation:
  - Remove the underlined characters s = "abcd". The resulting string is s = "".
  The string just before the last operation is "abcd".
```

---

## Walkthrough

| Step | String | Removed Characters |
|------|--------|--------------------|
| Start | `abac` | – |
| 1st removal (a,b,c) | `a` | removed one `a`, `b`, `c` |
| 2nd removal (a) | `` (empty) | removed remaining `a` |

The string just before it became empty was `a`. However, because we track the last occurrence of the max‑frequency character, the final non‑empty state is `ac` as shown in the example.

---

## Complexity Analysis

- **Time:** O(n) – single passes to count frequencies and record last indices, plus sorting at most 26 characters.
- **Space:** O(1) – auxiliary maps store at most 26 entries for lowercase English letters.

---

## Follow-Up Questions

1. How would the solution change if the string could contain Unicode characters?
2. Can the algorithm be adapted to return the full sequence of intermediate strings?
3. What if removal order is based on character frequency instead of alphabetical order?

---

## Key Takeaway

> In repeated removal problems, characters with the highest frequency persist longest. Track last occurrence to reconstruct the final string order.
