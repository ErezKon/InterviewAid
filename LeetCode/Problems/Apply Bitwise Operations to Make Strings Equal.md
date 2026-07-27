# 2546. Apply Bitwise Operations to Make Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal](https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal)
**Companies:** Sprinklr

---

## 1. Problem Description

Given two binary strings `s` and `target`, you can pick two indices `i ≠ j` and apply: `s[i] = s[i] OR s[j]`, `s[j] = s[i] XOR s[j]`. Determine if `s` can be transformed into `target`.

---

## 2. Key Insight

> The operation preserves whether at least one '1' exists. If both strings have at least one '1', or both are all '0's, the answer is `true`. Otherwise `false`.

The key observation: as long as there's a '1' in the string, you can propagate it anywhere and clear bits. But you can never create a '1' from all '0's.

---

## 3. Approach: Check Existence of '1' — O(n) ✅

```
FUNCTION makeStringsEqual(s, target):
    RETURN ('1' IN s) == ('1' IN target)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> When bit operations preserve the existence of a set bit, the only invariant to check is whether both strings contain (or both lack) a '1'.
