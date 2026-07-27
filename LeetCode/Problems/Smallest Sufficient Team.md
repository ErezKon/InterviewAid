# 1125. Smallest Sufficient Team

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-sufficient-team](https://leetcode.com/problems/smallest-sufficient-team)
**Companies:** Tcs

---

## Problem Description

Given a list of required skills and a list of people (each with a subset of skills), find the smallest team such that the union of their skills covers all required skills.

### Examples

- **Input:** `req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]` → **Output:** `[0,2]`

## Approach: Bitmask DP — O(2^m · n) ✅

**Key Insight:** Represent skill coverage as a bitmask. Use DP where `dp[mask]` stores the smallest team achieving that skill set.

```
FUNCTION smallestSufficientTeam(req_skills, people):
    skillIdx = {s: i for i, s in enumerate(req_skills)}
    m = len(req_skills)
    target = (1 << m) - 1

    // dp[mask] = smallest team covering mask
    dp = {0: []}

    FOR i, person IN enumerate(people):
        personMask = 0
        FOR skill IN person:
            IF skill IN skillIdx:
                personMask |= 1 << skillIdx[skill]

        FOR mask, team IN list(dp.items()):
            newMask = mask | personMask
            IF newMask NOT IN dp OR len(dp[newMask]) > len(team) + 1:
                dp[newMask] = team + [i]

    RETURN dp[target]
```

### Complexity

| | |
|---|---|
| **Time** | O(2^m · n) |
| **Space** | O(2^m) |
