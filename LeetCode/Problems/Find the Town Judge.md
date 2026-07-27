# 997. Find the Town Judge

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-town-judge](https://leetcode.com/problems/find-the-town-judge)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft, Turing

---

```
FUNCTION findJudge(n, trust):
    score = [0] * (n + 1)
    FOR [a, b] IN trust:
        score[a] -= 1    // a trusts someone
        score[b] += 1    // b is trusted
    FOR i ← 1 TO n:
        IF score[i] == n - 1: RETURN i
    RETURN -1
```

Judge: trusted by n-1 people, trusts nobody. Net score = n-1.
