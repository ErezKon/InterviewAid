# 2092. Find All People With Secret

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-people-with-secret](https://leetcode.com/problems/find-all-people-with-secret)
**Companies:** Amazon, Google, Uber

---

## Problem Description

Person 0 shares a secret with `firstPerson` at time 0. A list of meetings `[x, y, time]` occurs; meetings happening at the same `time` happen simultaneously. If either participant knows the secret before a meeting, both learn it after the meeting. Return all people who know the secret after all meetings.

---

## Approach: Union‑Find by Time Groups — O(n log n) ✅

```text
FUNCTION findAllPeople(n, meetings, firstPerson):
    SORT meetings BY time
    known ← SET([0, firstPerson])
    i ← 0
    WHILE i < LENGTH(meetings):
        currentTime ← meetings[i][2]
        // Build Union‑Find for this time slice
        uf ← UnionFind()
        j ← i
        WHILE j < LENGTH(meetings) AND meetings[j][2] == currentTime:
            x, y ← meetings[j][0], meetings[j][1]
            uf.UNION(x, y)
            j ← j + 1
        // Propagate secret within each component
        FOR person IN UNIQUE participants of meetings[i:j]:
            IF ANY member of uf.COMPONENT(person) IN known:
                known.ADD_ALL(uf.COMPONENT(person))
        i ← j
    RETURN LIST(known)
```

---

## Examples

| meetings | firstPerson | Output |
|----------|-------------|--------|
| `[[0,2,1],[1,3,1],[2,3,2]]` | 3 | `[0,1,2,3]` |
| `[[0,1,1],[1,2,2],[2,3,3]]` | 1 | `[0,1,2,3]` |

---

## Walkthrough

Take the first example:
1. **Time 1:** meetings `(0,2)` and `(1,3)`. Union‑Find creates two components `{0,2}` and `{1,3}`. Known set is `{0,3}` (0 knows secret, 3 knows because `firstPerson=3`). Component `{0,2}` contains 0 → add 2. Component `{1,3}` contains 3 → add 1. Known becomes `{0,1,2,3}`.
2. **Time 2:** meeting `(2,3)`. Both already know the secret, so no change.
3. End result includes everyone.

---

## Complexity Analysis

- **Time:** O(m log m) for sorting `m` meetings plus near‑linear Union‑Find operations per time group.
- **Space:** O(n + m) for the Union‑Find structure and the known set.

---

## Follow‑Up Questions

1. How would you handle meetings that occur at the same time but form a chain of connections (e.g., `0‑1`, `1‑2` at the same timestamp)?
2. Can the solution be adapted to return the earliest time each person learns the secret?
3. How would you modify the algorithm if meetings could be added dynamically after processing has begun?

---

## Key Takeaway

> **Group meetings by timestamp, use Union‑Find within each group, and propagate the secret only when a component contains a known person. This isolates propagation to the correct time slice and avoids premature sharing.**