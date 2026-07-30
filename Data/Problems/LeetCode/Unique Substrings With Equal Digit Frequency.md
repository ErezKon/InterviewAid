# 2168. Unique Substrings With Equal Digit Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-substrings-with-equal-digit-frequency](https://leetcode.com/problems/unique-substrings-with-equal-digit-frequency)
**Companies:** Expedia

---

## Problem Description
Given a string `s` consisting of digits `'0'‑'9'`, a substring is **good** if each distinct digit that appears in the substring occurs the same number of times. Return the number of distinct good substrings of `s`.

## Examples
**Example 1**
```
Input: s = "1122"
Output: 5
Explanation: The good substrings are "1", "2", "11", "22", "1122".
```
**Example 2**
```
Input: s = "123"
Output: 3
Explanation: Only the single‑character substrings are good.
```

## Approach
Frequency‑Map Sliding Window – expand the right end while maintaining a count map. For each left index, shrink the window when the frequencies become unbalanced. Record each window that satisfies the equal‑frequency condition in a hash set.

```text
FUNCTION countEqualFreqSubstrings(s):
    SET resultSet ← empty set
    n ← LENGTH(s)
    FOR left ← 0 TO n - 1:
        freq ← array[10] of zeros
        maxFreq ← 0
        distinct ← 0
        FOR right ← left TO n - 1:
            digit ← INTEGER(s[right])
            IF freq[digit] == 0: distinct += 1
            freq[digit] += 1
            maxFreq ← MAX(maxFreq, freq[digit])
            // All non‑zero frequencies must equal maxFreq
            IF maxFreq * distinct == (right - left + 1):
                resultSet.ADD(s[left..right])
    RETURN SIZE(resultSet)
```
The condition `maxFreq * distinct == windowLength` guarantees every present digit appears exactly `maxFreq` times.

## Walkthrough
For `s = "1122"`:
- left=0, expand right: "1" (freq {1:1}) → good, add.
- right=1, "11" (freq {1:2}) → good, add.
- right=2, "112" (freq {1:2,2:1}) → maxFreq=2, distinct=2, 2*2≠3 → not good.
- right=3, "1122" (freq {1:2,2:2}) → 2*2=4 → good, add.
Repeating for other left positions yields the remaining good substrings "2" and "22".

## Complexity Analysis
Time: O(n²) – two nested loops over the string.
Space: O(1) extra for the frequency array plus O(k) for the result set where k is the number of distinct good substrings.

## Follow‑Up Questions
* Can the solution be improved to O(n) using combinatorial counting?
* How would the problem change if the alphabet were larger (e.g., all lowercase letters)?
* What if we required the substrings to have at least two distinct digits?

## Key Takeaway
A substring has equal digit frequency when the product of the maximum digit count and the number of distinct digits equals the window length; tracking this condition while sliding a window lets us enumerate all good substrings.
