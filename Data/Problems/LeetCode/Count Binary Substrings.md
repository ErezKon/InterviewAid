# 696. Count Binary Substrings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-binary-substrings](https://leetcode.com/problems/count-binary-substrings)
**Companies:** Amazon, Bloomberg, Blue Origin, De Shaw, Dell, Google, Helix, Ibm, Jpmorgan, Meesho, Meta, Microsoft, Oracle, Salesforce, Tiktok, Uber, Wells Fargo, Weride

---

## Problem Description
Given a binary string `s`, return the number of non-empty substrings that have the same number of `0`'s and `1`'s, and all the `0`'s and all the `1`'s in these substrings are grouped consecutively.

Substrings that occur multiple times are counted the number of times they occur.

(A valid substring is a non‑empty block of `0`s followed by an equal-length block of `1`s, or vice‑versa.)

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

## Examples
```
Example 1:
  Input: s = "00110011"
  Output: 6
  Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
  Notice that some of these substrings repeat and are counted the number of times they occur.
  Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.
```

```
Example 2:
  Input: s = "10101"
  Output: 4
  Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.
```

## Approach
Group the string into consecutive runs of identical characters. For each adjacent pair of groups with lengths `a` and `b`, the number of valid substrings contributed is `min(a, b)`. Summing over all adjacent pairs yields the answer.

### Pseudocode
```text
FUNCTION countBinarySubstrings(s):
    prev ← 0
    curr ← 1
    count ← 0
    FOR i ← 1 TO LENGTH(s) - 1:
        IF s[i] == s[i-1]:
            SET curr ← curr + 1
        ELSE:
            SET count ← count + MIN(prev, curr)
            SET prev ← curr
            SET curr ← 1
    SET count ← count + MIN(prev, curr)
    RETURN count
```

## Walkthrough
For `s = "00110011"`:
1. Groups lengths: [2,2,2,2]
2. Adjacent pairs: (2,2) → 2, (2,2) → 2, (2,2) → 2
3. Sum = 6, matching the output.

## Complexity Analysis
- Time: O(n) – single pass through the string.
- Space: O(1) – only a few integer variables.

## Follow-Up Questions
- How would you modify the algorithm to count substrings with at most `k` consecutive groups?
- Can this be extended to ternary strings with three characters?
- What is the relationship between this problem and run‑length encoding?

## Key Takeaway
Counting equal‑group binary substrings reduces to summing `min(length_of_current_group, length_of_previous_group)` for each adjacent pair, enabling an O(n) solution.
