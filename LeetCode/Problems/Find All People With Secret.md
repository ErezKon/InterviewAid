# 2092. Find All People With Secret

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-people-with-secret](https://leetcode.com/problems/find-all-people-with-secret)
**Companies:** Amazon, Google, Uber

---

## Problem Description

Person 0 shares a secret with `firstPerson` at time 0. Meetings `[x, y, time]` happen simultaneously at each time. If either person knows the secret, both learn it. Return all people who know the secret.

---

## Approach: Union-Find by Time Groups — O(n log n) ✅

```
FUNCTION findAllPeople(n, meetings, firstPerson):
    SORT meetings BY time
    known = SET([0, firstPerson])

    FOR each time group (same time):
        uf = UnionFind()
        FOR [x, y, t] IN group:
            uf.UNION(x, y)
        // Check which components contain a known person
        FOR person IN group participants:
            IF any member of person's component IN known:
                add all component members to known
        // Reset UF for non-secret components

    RETURN list(known)
```

---

## Key Takeaway

> **Group meetings by time, Union-Find within each group, propagate secret if any member knows it. Reset non-secret unions to prevent false propagation across time steps.**
