# 3158. Find the XOR of Numbers Which Appear Twice

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice](https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice)
**Companies:** Google, Meta

---

## Problem Description
Given an integer array `nums`, each element appears either once or twice. Return the XOR of all elements that appear exactly twice. The order of elements does not matter.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,2,1]
Output: 3
Explanation: 1 and 2 appear twice, 1 XOR 2 XOR 1 XOR 2 = 0, leaving 3.
```
**Example 2:**
```
Input: nums = [4,5,5,4,6]
Output: 0
Explanation: 4 and 5 each appear twice, their XOR cancels out, leaving 0.
```

## Approach
Use the XOR operation's property that `a XOR a = 0` and `a XOR 0 = a`. Iterate through the array, XORing each element. Elements appearing twice cancel out, leaving the XOR of the remaining elements (which are the ones that appear twice, resulting in 0) – to obtain the XOR of numbers that appear twice, we can XOR all elements and then XOR the result with the XOR of elements that appear once (found via a frequency map). Simpler: count frequencies, XOR numbers with count == 2.

```text
FUNCTION xorOfTwice(nums):
    freq ← MAP()
    FOR num IN nums:
        freq[num] ← freq.get(num, 0) + 1
    result ← 0
    FOR (num, count) IN freq:
        IF count == 2:
            result ← result XOR num
    RETURN result
```
The map uses O(n) space; the XOR loop is O(n).

## Walkthrough
| Index | num | freq after update | result |
|-------|-----|-------------------|--------|
| 0 | 1 | {1:1} | 0 |
| 1 | 2 | {1:1,2:1} | 0 |
| 2 | 3 | {1:1,2:1,3:1} | 0 |
| 3 | 2 | {1:1,2:2,3:1} | 0 XOR 2 = 2 |
| 4 | 1 | {1:2,2:2,3:1} | 2 XOR 1 = 3 |
Result = 3.

## Complexity Analysis
- **Time:** O(n) to build frequency map and compute XOR.
- **Space:** O(n) for the frequency map (can be O(1) if numbers are bounded).

## Follow‑Up Questions
1. How would you solve the problem with O(1) extra space if the range of numbers is limited?
2. Can you extend the solution to handle numbers appearing three times?
3. What if the array is read‑only and you cannot use extra storage?

## Key Takeaway
XOR cancels out duplicate values, making it a powerful tool for problems involving pairs or even‑occurrence elements.
