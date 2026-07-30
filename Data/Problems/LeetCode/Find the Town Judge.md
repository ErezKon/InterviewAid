# 997. Find the Town Judge

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-town-judge](https://leetcode.com/problems/find-the-town-judge)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft, Turing

---

## Problem Description
In a town of `n` people labeled from `1` to `n`, there is a trust relationship represented by an array `trust` where each element `[a, b]` means person `a` trusts person `b`. The town judge is the unique person who **trusts nobody** and is **trusted by everyone else** (i.e., `n‑1` people). Return the label of the town judge if they exist, otherwise return `-1`.

## Examples
**Example 1**
```
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3
Explanation: Person 3 is trusted by 1 and 2 and trusts nobody.
```

**Example 2**
```
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
Explanation: Person 3 trusts person 1, so there is no judge.
```

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
