# 781. Rabbits in Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rabbits-in-forest](https://leetcode.com/problems/rabbits-in-forest)
**Companies:** Amazon, Bloomberg, Cars24, Dp World, Google, Meta, Microsoft, Wish, Zepto

---

## Problem Description

There is a forest with an unknown number of rabbits. We asked n rabbits **"How many other rabbits have the same color as you?"** and collected the answers in an integer array `answers` where `answers[i]` is the answer of the `i^th` rabbit.

Given the array `answers`, return *the minimum number of rabbits that could be in the forest*.

**Constraints:**
- `1 <= answers.length <= 1000`
- `0 <= answers[i] < 1000`

## Examples

**Example 1:**
```
Input: answers = [1,1,2]
Output: 5
Explanation: The two rabbits that answered "1" could both be the same color, say red.
The rabbit that answered "2" can't be red or the answers would be inconsistent.
Say the rabbit that answered "2" was blue.
Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.
```

**Example 2:**
```
Input: answers = [10,10,10]
Output: 11
```

## Approach
**Greedy Counting – Group by Reported Size**
1. Count the frequency of each answer `k`.
2. For each `k`, the group size is `k+1`.
3. The number of groups needed is `ceil(freq / (k+1))`.
4. Add `groups * (k+1)` to the total.
This ensures we pack as many rabbits as possible into each group while respecting the reported size.

```text
FUNCTION numRabbits(answers):
    SET countMap ← DICTIONARY
    FOR ans IN answers:
        INCREMENT countMap[ans]
    SET total ← 0
    FOR each (k, freq) IN countMap:
        SET groupSize ← k + 1
        SET groups ← CEIL(freq / groupSize)
        SET total ← total + groups * groupSize
    RETURN total
```

## Walkthrough
For `answers = [1,1,2]`:
- `k=1` → groupSize=2, freq=2 → groups=1 → contributes 2.
- `k=2` → groupSize=3, freq=1 → groups=1 → contributes 3.
Total = 5.

## Complexity Analysis
Time: O(n) to count frequencies, where n is length of `answers`.
Space: O(m) for the map, where m is the number of distinct answers.

## Follow‑Up Questions
1. How would the solution change if rabbits could lie about their group size?
2. Can you adapt the algorithm to output the actual grouping of rabbits?
3. What is the impact on complexity if the answer values can be very large (e.g., up to 10⁹)?

## Key Takeaway
Grouping rabbits by the reported size and using ceiling division yields the minimal possible total count, leveraging a simple greedy aggregation.
