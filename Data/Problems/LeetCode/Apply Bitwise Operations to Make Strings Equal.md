# 2546. Apply Bitwise Operations to Make Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal](https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal)
**Companies:** Sprinklr

---

## 1. Problem Description

You are given two **0-indexed binary** strings `s` and `target` of the same length `n`. You can do the following operation on `s` **any** number of times:

- Choose two **different** indices `i` and `j` where `0 <= i, j < n`.
- Simultaneously, replace `s[i]` with (`s[i]` **OR** `s[j]`) and `s[j]` with (`s[i]` **XOR** `s[j]`).

For example, if `s = "0110"`, you can choose `i = 0` and `j = 2`, then simultaneously replace `s[0]` with (`s[0]` **OR** `s[2]` = `0` **OR** `1` = `1`), and `s[2]` with (`s[0]` **XOR** `s[2]` = `0` **XOR** `1` = `1`), so we will have `s = "1110"`.

Return `true` *if you can make the string* `s` *equal to* `target`*, or* `false` *otherwise*.

**Constraints:**
- `n == s.length == target.length`
- `2 <= n <= 10^5`
- `s` and `target` consist of only the digits `0` and `1`.

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

```
Example 1:
  Input: s = "1010", target = "0110"
  Output: true
  Explanation: We can do the following operations:
  - Choose i = 2 and j = 0. We have now s = "0010".
  - Choose i = 2 and j = 1. We have now s = "0110".
  Since we can make s equal to target, we return true.
```
```
Example 2:
  Input: s = "11", target = "00"
  Output: false
  Explanation: It is not possible to make s equal to target with any number of operations.
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

## 7. Follow-Up Questions

- How would the solution change if the operation allowed swapping bits instead of the OR/XOR combo?
- Can you extend the approach to strings over a larger alphabet with similar propagation rules?
- What is the minimum number of operations required when transformation is possible?

---

## Key Takeaway

> When bitwise operations preserve the existence of a set bit, the only invariant to check is whether both strings contain (or both lack) a `1`.
