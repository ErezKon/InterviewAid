# 3766. Minimum Operations to Make Binary Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome](https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome)
**Companies:** Teradata

---

## Problem Description
You are given an integer array `nums`.

For each element `nums[i]`, you may perform the following operations **any** number of times (including zero):

- Increase `nums[i]` by 1, or
- Decrease `nums[i]` by 1.

A number is called a **binary palindrome** if its binary representation without leading zeros reads the same forward and backward.

Your task is to return an integer array `ans`, where `ans[i]` represents the **minimum** number of operations required to convert `nums[i]` into a **binary palindrome**.

**Constraints:**
- `1 ≤ nums.length ≤ 5000`
- `1 ≤ nums[i] ≤ 5000`

## Examples

```
Example 1:
  Input: nums = [1,2,4]
  Output: [0,1,1]
  Explanation: One optimal set of operations:
  nums[i] | Binary | Nearest Palindrome | Binary (Palindrome) | Operations Required | ans[i]
  1       | 1      | 1                  | 1                   | Already palindrome  | 0
  2       | 10     | 3                  | 11                  | Increase by 1       | 1
  4       | 100    | 3                  | 11                  | Decrease by 1       | 1
  Thus, ans = [0, 1, 1].
```

```
Example 2:
  Input: nums = [6,7,12]
  Output: [1,0,3]
  Explanation: One optimal set of operations:
  nums[i] | Binary | Nearest Palindrome | Binary (Palindrome) | Operations Required | ans[i]
  6       | 110    | 5                  | 101                 | Decrease by 1       | 1
  7       | 111    | 7                  | 111                 | Already palindrome  | 0
  12      | 1100   | 15                 | 1111                | Increase by 3       | 3
  Thus, ans = [1, 0, 3].
```

## Approach
A palindrome reads the same from both ends, so for each symmetric pair of indices `(i, n-1-i)` we only need to ensure the characters match. If they differ, one flip is sufficient to make them equal. Thus the answer is the count of mismatched pairs.

**Algorithm**
1. Initialise `flips = 0`.
2. For `i` from `0` to `⌊(n-1)/2⌋`:
   - If `s[i] != s[n-1-i]`, increment `flips`.
3. Return `flips`.

**Pseudocode**
```text
FUNCTION minFlipsToPalindrome(s):
    SET n ← LENGTH(s)
    SET flips ← 0
    FOR i ← 0 TO (n DIV 2) - 1:
        IF s[i] ≠ s[n - 1 - i]:
            SET flips ← flips + 1
    RETURN flips
```

## Walkthrough
Example `s = "1100"` (n = 4):
| i | s[i] | s[n-1-i] | Mismatch? | flips |
|---|------|----------|-----------|-------|
|0|1|0|yes|1|
|1|1|0|yes|2|
Result `flips = 2`.

## Complexity Analysis
- **Time:** `O(n)` – one pass over half the string.
- **Space:** `O(1)` – constant extra space.

## Follow-Up Questions
1. How would the solution change if each flip had a different cost depending on its position?
2. Can you extend the algorithm to return the actual indices to flip?
3. What if the string contains more than two characters (e.g., ternary strings) – does the same logic apply?

## Key Takeaway
The minimum flips equal the number of mismatched symmetric pairs; each mismatch can be resolved with a single flip.
