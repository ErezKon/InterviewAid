# 1733. Minimum Number of People to Teach

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-people-to-teach](https://leetcode.com/problems/minimum-number-of-people-to-teach)
**Companies:** Amazon, Bloomberg, Duolingo, Google

---

## Problem Description

On a social network consisting of `m` users and some friendships between users, two users can communicate with each other if they know a common language.

You are given an integer `n`, an array `languages`, and an array `friendships` where:

- There are `n` languages numbered `1` through `n`,
- `languages[i]` is the set of languages the `i^th` user knows, and
- `friendships[i] = [u_i, v_i]` denotes a friendship between the users `u^_i` and `v_i`.

You can choose **one** language and teach it to some users so that all friends can communicate with each other. Return the* ***minimum** *number of users you need to teach.*
Note that friendships are not transitive, meaning if `x` is a friend of `y` and `y` is a friend of `z`, this doesn't guarantee that `x` is a friend of `z`.

**Constraints:**
- `2 <= n <= 500`
- `languages.length == m`
- `1 <= m <= 500`
- `1 <= languages[i].length <= n`
- `1 <= languages[i][j] <= n`
- `1 <= u_i < v_i <= languages.length`
- `1 <= friendships.length <= 500`
- All tuples `(u_i, v_i)` are unique
- `languages[i]` contains only unique values

## Examples

**Example 1:**
```
Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.
```

**Example 2:**
```
Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.
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
Consider Example 1. The conflicting friendships are none because each pair already shares a language, so `needTeach` is empty and the function returns `0`. In a case where a conflict exists, `needTeach` would contain the two endpoints of that edge, and the loop over languages would find the language that minimizes additional teachings.

## Complexity Analysis
- **Time:** O(n + m + n · k) where `m` is the number of friendships and `k` is the size of `needTeach` (≤ 2 · m). In practice O(n · k) dominates.
- **Space:** O(n + k) for storing language sets and the `needTeach` set.

## Follow-Up Questions
1. How would the solution change if you could teach **different** languages to different people?
2. What if each person could learn at most one new language?
3. Can the problem be extended to weighted friendships where some pairs are more critical to connect?

## Key Takeaway
Identify the minimal set of people involved in conflicts and choose a single language that covers the most of them; teaching the remaining people that language yields the optimal answer.
