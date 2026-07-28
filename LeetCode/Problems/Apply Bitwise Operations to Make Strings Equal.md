# 2546. Apply Bitwise Operations to Make Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal](https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal)
**Companies:** Sprinklr

---

## 1. Problem Description

Given two binary strings `s` and `target` of equal length, you may repeatedly pick two distinct indices `i` and `j` and perform the operations: `s[i] = s[i] OR s[j]` and `s[j] = s[i] XOR s[j]`. Determine whether it is possible to transform `s` into `target` using any number of such operations.

---

## 2. Key Insight

> The operations never create a `1` if the string is all `0`s, and they can propagate an existing `1` to any position. Hence the only invariant is whether each string contains at least one `1`.

---

## 3. Approach: Check Existence of '1' — O(n) ✅

```text
FUNCTION makeStringsEqual(s, target):
    // Return true iff both strings have a '1' or both have none
    SET hasOneS ← ('1' IN s)
    SET hasOneT ← ('1' IN target)
    RETURN hasOneS == hasOneT
```

---

## 4. Examples

**Example 1:**
```
Input: s = "1010", target = "0110"
Output: true
Explanation: Both strings contain at least one '1', so transformation is possible.
```

**Example 2:**
```
Input: s = "0000", target = "1111"
Output: false
Explanation: `s` has no '1' to propagate, while `target` requires a '1'.
```

---

## 5. Walkthrough

| Step | s (current) | Action | Result |
|------|--------------|--------|--------|
| 1 | "1010" | `hasOneS = true`, `hasOneT = true` | Condition satisfied → return true |
| 2 | "0000" | `hasOneS = false`, `hasOneT = true` | Mismatch → return false |

The algorithm simply checks the presence of a `1` in each string and returns the equality of those booleans.

---

## 6. Complexity Analysis

- **Time:** O(n) where n is the length of the strings, for a single scan to detect a `1`.
- **Space:** O(1) extra space.

---

## 7. Follow‑Up Questions

- How would the solution change if the operation allowed swapping bits instead of the OR/XOR combo?
- Can you extend the approach to strings over a larger alphabet with similar propagation rules?
- What is the minimum number of operations required when transformation is possible?

---

## Key Takeaway

> When bitwise operations preserve the existence of a set bit, the only invariant to check is whether both strings contain (or both lack) a `1`.
