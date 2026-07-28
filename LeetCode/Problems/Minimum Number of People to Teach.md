# 1733. Minimum Number of People to Teach

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-people-to-teach](https://leetcode.com/problems/minimum-number-of-people-to-teach)
**Companies:** Amazon, Bloomberg, Duolingo, Google

---

## Problem Description
Given `n` people numbered from `1` to `n`, each person knows a set of languages. You are also given a list of friendships where each friendship is a pair `[u, v]`. Two friends can communicate if they share at least one common language. Determine the minimum number of people that need to be taught a single new language so that every pair of friends can communicate.

## Examples
**Example 1**
```
Input: n = 3, languages = [[1],[2,3],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: Teaching person 2 language 1 makes all friendships communicable.
```
**Example 2**
```
Input: n = 2, languages = [[2],[1,2]], friendships = [[1,2]]
Output: 0
Explanation: They already share language 2.
```

## Approach
The problem reduces to teaching a language to all people involved in *conflicting* friendships (those that currently share no language). For each language, count how many of those conflicted people do **not** know it. The minimum of these counts is the answer.

```text
FUNCTION minimumTeachings(n, languages, friendships):
    // Convert each person's language list to a set for O(1) lookup
    langs ← [SET(l) FOR l IN languages]
    // Identify people that appear in a friendship without a common language
    needTeach ← EMPTY SET
    FOR [u, v] IN friendships:
        IF NOT (langs[u-1] ∩ langs[v-1]):
            ADD u TO needTeach
            ADD v TO needTeach
    // If no conflicting friendships, answer is 0
    IF needTeach IS EMPTY:
        RETURN 0
    // Try every possible language (1 … n) and count how many of needTeach lack it
    minTeach ← SIZE(needTeach)
    FOR lang ← 1 TO n:
        teach ← 0
        FOR p IN needTeach:
            IF lang NOT IN langs[p-1]:
                teach ← teach + 1
        minTeach ← MIN(minTeach, teach)
    RETURN minTeach
```

## Walkthrough
Consider Example 1. The conflicting friendships are none because each pair already shares a language, so `needTeach` is empty and the function returns `0`. In a case where a conflict exists, `needTeach` would contain the two endpoints of that edge, and the loop over languages would find the language that minimizes additional teachings.

## Complexity Analysis
- **Time:** O(n + m + n · k) where `m` is the number of friendships and `k` is the size of `needTeach` (≤ 2 · m). In practice O(n · k) dominates.
- **Space:** O(n + k) for storing language sets and the `needTeach` set.

## Follow-Up Questions
1. How would the solution change if you could teach **different** languages to different people?
2. What if each person could learn at most one new language?
3. Can the problem be extended to weighted friendships where some pairs are more critical to connect?

## Key Takeaway
Identify the minimal set of people involved in conflicts and choose a single language that covers the most of them; teaching the remaining people that language yields the optimal answer.
