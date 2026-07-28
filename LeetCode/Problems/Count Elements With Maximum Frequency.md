# 3005. Count Elements With Maximum Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-elements-with-maximum-frequency](https://leetcode.com/problems/count-elements-with-maximum-frequency)
**Companies:** Amazon, Bloomberg, Capgemini, Cred, Google, Meta, Microsoft, Walmart Labs

---

## Problem Description
Given an integer array `nums`, determine the maximum frequency of any element in the array and return the total number of elements that appear exactly that many times.

## Examples
**Example 1:**
```
Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: The maximum frequency is 2 (elements 1 and 2). There are 4 elements with this frequency.
```
**Example 2:**
```
Input: nums = [1,1,2,2,3,3]
Output: 6
Explanation: All elements appear twice, which is the maximum frequency.
```

## Approach
Count the occurrences of each value using a hash map, find the highest count, then sum the counts that equal this maximum.

### Pseudocode
```text
FUNCTION maxFrequencyElements(nums):
    CREATE freqMap ← EMPTY MAP
    FOR each num IN nums:
        INCREMENT freqMap[num] BY 1
    SET maxFreq ← 0
    FOR each count IN freqMap VALUES:
        IF count > maxFreq:
            SET maxFreq ← count
    SET result ← 0
    FOR each count IN freqMap VALUES:
        IF count == maxFreq:
            SET result ← result + count
    RETURN result
```

## Walkthrough
For `nums = [1,2,2,3,1,4]`:
- Frequency map: {1:2, 2:2, 3:1, 4:1}
- `maxFreq` becomes 2.
- Summing counts equal to 2 → 2 + 2 = 4, which is returned.

## Complexity Analysis
The algorithm scans the array twice, yielding **Time O(n)** and uses a hash map of size up to the number of distinct elements, **Space O(k)** where *k* ≤ *n*.

## Follow-Up Questions
1. How would you modify the solution to return the list of elements with maximum frequency instead of the count?
2. Can this be solved in a single pass without storing the full frequency map?
3. How would the approach change if the input were a data stream?

## Key Takeaway
A simple frequency map lets you identify the maximum occurrence and sum all elements that share it in linear time.
