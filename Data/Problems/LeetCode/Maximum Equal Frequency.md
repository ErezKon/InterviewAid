# 1224. Maximum Equal Frequency

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-equal-frequency](https://leetcode.com/problems/maximum-equal-frequency)
**Companies:** American Express

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Frequency of Frequencies — O(n)](#approach-frequency-of-frequencies--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` of positive integers, return the longest possible length of an array prefix of `nums`, such that it is possible to remove **exactly one** element from this prefix so that every number that has appeared in it will have the same number of occurrences.

If after removing one element there are no remaining elements, it's still considered that every appeared number has the same number of ocurrences (0).

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [2,2,1,1,5,3,3,5]
Output: 7
Explanation: For the subarray [2,2,1,1,5,3,3] of length 7, if we remove nums[4] = 5, we will get [2,2,1,1,3,3], so that each number will appear exactly twice.
```

**Example 2:**
```
Input: nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
Output: 13
```

---

## Key Insight

> Track `count[val]` (frequency of each value) and `countFreq[f]` (how many values have frequency f). At each prefix, check if removing one element makes all frequencies equal. Valid cases:
> 1. All values have freq 1 (remove any)
> 2. Only one unique value (remove one occurrence)
> 3. All have freq f except one with freq f+1 (remove from the f+1 one)
> 4. All have freq f except one with freq 1 (remove that one entirely)

---

## Approach: Frequency of Frequencies — O(n) ✅

```text
FUNCTION maxEqualFreq(nums):
    count = {}               // value → frequency
    countFreq = {}           // frequency → how many values have this frequency
    maxFreq = 0
    result = 0
    FOR i ← 0 TO len(nums) - 1:
        val = nums[i]
        prev = count.get(val, 0)
        IF prev > 0:
            countFreq[prev] -= 1
        count[val] = prev + 1
        countFreq[prev + 1] = countFreq.get(prev + 1, 0) + 1
        maxFreq = MAX(maxFreq, prev + 1)

        totalVals = len(count)
        // case 1: all frequencies are 1
        IF maxFreq == 1:
            result = i + 1
        // case 2: one value has frequency maxFreq, others have maxFreq-1
        ELIF maxFreq * countFreq[maxFreq] == i:
            result = i + 1
        // case 3: one value occurs once, others have maxFreq
        ELIF (maxFreq - 1) * (totalVals - 1) + 1 == i + 1:
            result = i + 1
        // case 4: only one unique value
        ELIF totalVals == 1:
            result = i + 1
    RETURN result
```

---

## Walkthrough

Consider the first example `[2,2,1,1,5,3,3,5]`.

| i | val | count | countFreq | maxFreq | Valid? | result |
|---|-----|-------|-----------|---------|--------|--------|
|0|2|{2:1}|{1:1}|1|case 1 → result=1|1|
|1|2|{2:2}|{2:1}|2|case 4 (single value) → result=2|2|
|2|1|{2:2,1:1}|{2:1,1:1}|2|none → result stays|2|
|3|1|{2:2,1:2}|{2:2}|2|maxFreq*countFreq[maxFreq]=2*2=4 = i+1 → result=4|4|
|4|5|{2:2,1:2,5:1}|{2:2,1:1}|2|none|4|
|5|3|{2:2,1:2,5:1,3:1}|{2:2,1:2}|2|none|4|
|6|3|{2:2,1:2,5:1,3:2}|{2:3,1:1}|2|(maxFreq-1)*(totalVals-1)+1 = 1*3+1=4 ≠ i+1, but maxFreq*countFreq[maxFreq]=2*3=6 = i+1 → result=7|7|
|7|5|{2:2,1:2,5:2,3:2}|{2:4}|2|maxFreq*countFreq[maxFreq]=2*4=8 = i+1 → result=8|8|

The longest prefix satisfying the condition is length `7`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Freq of freq | **O(n)** | O(n) |

---

## Follow-Up Questions

1. How would the solution change if you could remove **at most two** elements?
2. Can you adapt the algorithm to return the actual element index to remove?
3. What if the array is streamed and you must output the answer online?

---

## Key Takeaway

> **"Remove one to equalize frequencies" requires tracking frequency‑of‑frequencies.** Check the 4 valid cases at each prefix length.
