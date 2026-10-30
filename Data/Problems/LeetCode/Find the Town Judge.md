# 997. Find the Town Judge

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-town-judge](https://leetcode.com/problems/find-the-town-judge)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft, Turing

---

## Problem Description
In a town, there are `n` people labeled from `1` to `n`. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

1. The town judge trusts nobody.
2. Everybody (except for the town judge) trusts the town judge.
3. There is exactly one person that satisfies properties **1** and **2**.

You are given an array `trust` where `trust[i] = [a_i, b_i]` representing that the person labeled `a_i` trusts the person labeled `b_i`. If a trust relationship does not exist in `trust` array, then such a trust relationship does not exist.

Return *the label of the town judge if the town judge exists and can be identified, or return* `-1` *otherwise*.

## Examples
**Example 1:**
```
Input: n = 2, trust = [[1,2]]
Output: 2
```

**Example 2:**
```
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3
```

**Example 3:**
```
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
```

## Constraints
- `1 <= n <= 1000`
- `0 <= trust.length <= 10^4`
- `trust[i].length == 2`
- All the pairs of `trust` are **unique**.
- `a_i != b_i`
- `1 <= a_i, b_i <= n`

## Approach
Maintain a `score` array where `score[i]` counts how many people trust `i` minus how many people `i` trusts. For each trust pair `[a, b]`:
- Decrement `score[a]` (a trusts someone).
- Increment `score[b]` (b is trusted).
After processing all pairs, the judge is the index `i` with `score[i] == n‑1`.

### Pseudocode
```text
FUNCTION findJudge(n, trust):
    SET score ← ARRAY OF n+1 ZEROES
    FOR pair IN trust:
        SET a ← pair[0]
        SET b ← pair[1]
        SET score[a] ← score[a] - 1
        SET score[b] ← score[b] + 1
    FOR i ← 1 TO n:
        IF score[i] == n - 1:
            RETURN i
    RETURN -1
```

## Walkthrough
For `n = 3, trust = [[1,3],[2,3]]`:
| Person | score change | final score |
|--------|--------------|-------------|
|1| -1 (trusts) | -1 |
|2| -1 (trusts) | -1 |
|3| +1 (trusted by 1) +1 (trusted by 2) | 2 |
Only person 3 has score `n‑1 = 2`, so return 3.

## Complexity Analysis
- **Time:** O(m) where `m = trust.length`.
- **Space:** O(n) for the score array.

## Follow‑Up Questions
1. How would you solve the problem if the trust relationships are streamed in real time?
2. Can the algorithm be adapted to find all individuals with the maximum trust score, not necessarily a judge?
3. What changes are needed if there can be multiple judges (e.g., a council) and you need to list them?

## Key Takeaway
A single pass with a net‑trust score per person instantly identifies the unique judge, achieving linear time and space.
