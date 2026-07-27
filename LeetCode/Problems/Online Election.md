# 911. Online Election

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/online-election](https://leetcode.com/problems/online-election)
**Companies:** Bloomberg, Flipkart, Google

---

```
CLASS TopVotedCandidate:
    CONSTRUCTOR(persons, times):
        self.times = times
        self.leaders = []
        count = Counter(); leader = -1
        FOR p IN persons:
            count[p] += 1
            IF count[p] >= count[leader]: leader = p
            leaders.ADD(leader)

    FUNCTION q(t):
        idx = bisect_right(times, t) - 1
        RETURN leaders[idx]
```
