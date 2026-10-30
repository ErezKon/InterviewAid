# 2138. Divide a String Into Groups of Size k

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divide-a-string-into-groups-of-size-k](https://leetcode.com/problems/divide-a-string-into-groups-of-size-k)
**Companies:** Bloomberg, Canonical, Google

---

## Problem Description

A string `s` can be partitioned into groups of size `k` using the following procedure:

- The first group consists of the first `k` characters of the string, the second group consists of the next `k` characters of the string, and so on. Each element can be a part of **exactly one** group.
- For the last group, if the string **does not** have `k` characters remaining, a character `fill` is used to complete the group.

Note that the partition is done so that after removing the `fill` character from the last group (if it exists) and concatenating all the groups in order, the resultant string should be `s`.

Given the string `s`, the size of each group `k` and the character `fill`, return *a string array denoting the **composition of every group*** `s` *has been divided into, using the above procedure*.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of lowercase English letters only.
- `1 <= k <= 100`
- `fill` is a lowercase English letter.

---

## Examples

```
Example 1:
  Input: s = "abcdefghi", k = 3, fill = "x"
  Output: ["abc","def","ghi"]
  Explanation:
  The first 3 characters "abc" form the first group.
  The next 3 characters "def" form the second group.
  The last 3 characters "ghi" form the third group.
  Since all groups can be completely filled by characters from the string, we do not need to use fill.
  Thus, the groups formed are "abc", "def", and "ghi".
```

```
Example 2:
  Input: s = "abcdefghij", k = 3, fill = "x"
  Output: ["abc","def","ghi","jxx"]
  Explanation:
  Similar to the previous example, we are forming the first three groups "abc", "def", and "ghi".
  For the last group, we can only use the character 'j' from the string. To complete this group, we add 'x' twice.
  Thus, the 4 groups formed are "abc", "def", "ghi", and "jxx".
```

---

## Approach: Pad and Slice ✅

```text
FUNCTION divideString(s, k, fill):
    // Pad until length divisible by k
    WHILE LENGTH(s) MOD k != 0:
        SET s ← s + fill
    // Slice into chunks of size k
    SET groups ← []
    FOR i ← 0 TO LENGTH(s) - 1 STEP k:
        APPEND SUBSTRING(s, i, i + k) TO groups
    RETURN groups
```

The insight is to make the string length a multiple of `k` first, then a simple fixed‑size slicing yields the groups.

---

## Walkthrough

Take `s = "abcde"`, `k = 3`, `fill = "x"`:

1. Length of `s` is 5, `5 MOD 3 = 2` → not divisible.
2. Append `fill` → `s = "abcdex"` (length 6, now divisible).
3. Iterate `i = 0, 3`:
   - `i=0`: take `s[0:3] = "abc"`.
   - `i=3`: take `s[3:6] = "dex"`.
4. Result `["abc","dex"]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | One pass for padding and one pass for slicing. |
| **Space** | O(n) | Output list of groups plus possible padding. |

---

## Follow-Up Questions

- How would you handle Unicode characters where length may differ from byte count?
- Can you perform the operation in‑place on a mutable character array?
- What if the groups must be formed without padding, discarding leftover characters?

---

## Key Takeaway

> **Pad the string to make its length divisible by `k`, then slice into fixed‑size chunks.**