# 781. Rabbits in Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rabbits-in-forest](https://leetcode.com/problems/rabbits-in-forest)
**Companies:** Amazon, Bloomberg, Cars24, Dp World, Google, Meta, Microsoft, Wish, Zepto

---

## Problem Description
You are given an integer array `answers` where `answers[i]` is the response of the i‑th rabbit to the question “How many other rabbits have the same color as you?”. If a rabbit says `k`, it implies there are exactly `k+1` rabbits of that color. Determine the minimum total number of rabbits that could be present in the forest consistent with all answers.

## Examples
**Example 1:**
```
answers = [1,1,2]
Output: 5
Explanation: Two rabbits say "1" → they belong to a group of 2 (size 2). The rabbit saying "2" indicates a group of 3. Total = 2 + 3 = 5.
```
**Example 2:**
```
answers = [10,10,10]
Output: 33
Explanation: Each "10" means a group of 11 rabbits. Three answers can belong to the same group of 11, but we need three groups because a group of 11 can contain at most 11 rabbits. Hence 3 * 11 = 33.
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
