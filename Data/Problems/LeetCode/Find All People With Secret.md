# 2092. Find All People With Secret

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-people-with-secret](https://leetcode.com/problems/find-all-people-with-secret)
**Companies:** Amazon, Google, Uber

---

## Problem Description

You are given an integer `n` indicating there are `n` people numbered from `0` to `n - 1`. You are also given a **0-indexed** 2D integer array `meetings` where `meetings[i] = [x_i, y_i, time_i]` indicates that person `x_i` and person `y_i` have a meeting at `time_i`. A person may attend **multiple meetings** at the same time. Finally, you are given an integer `firstPerson`.

Person `0` has a **secret** and initially shares the secret with a person `firstPerson` at time `0`. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person `x_i` has the secret at `time_i`, then they will share the secret with person `y_i`, and vice versa.

The secrets are shared **instantaneously**. That is, a person may receive the secret and share it with people in other meetings within the same time frame.

Return *a list of all the people that have the secret after all the meetings have taken place.* You may return the answer in **any order**.

**Constraints:**

- `2 <= n <= 10^5`
- `1 <= meetings.length <= 10^5`
- `meetings[i].length == 3`
- `0 <= x_i, y_i <= n - 1`
- `x_i != y_i`
- `1 <= time_i <= 10^5`
- `1 <= firstPerson <= n - 1`

---

## Approach: Union‑Find by Time Groups — O(n log n) ✅

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

```
Example 1:
  Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
  Output: [0,1,2,3,5]
  Explanation:
  At time 0, person 0 shares the secret with person 1.
  At time 5, person 1 shares the secret with person 2.
  At time 8, person 2 shares the secret with person 3.
  At time 10, person 1 shares the secret with person 5.
  Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.
```

```
Example 2:
  Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
  Output: [0,1,3]
  Explanation:
  At time 0, person 0 shares the secret with person 3.
  At time 2, neither person 1 nor person 2 know the secret.
  At time 3, person 3 shares the secret with person 0 and person 1.
  Thus, people 0, 1, and 3 know the secret after all the meetings.
```

```
Example 3:
  Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
  Output: [0,1,2,3,4]
  Explanation:
  At time 0, person 0 shares the secret with person 1.
  At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
  Note that person 2 can share the secret at the same time as receiving it.
  At time 2, person 3 shares the secret with person 4.
  Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.
```

---

## Walkthrough

Take the first example:
1. **Time 1:** meetings `(0,2)` and `(1,3)`. Union‑Find creates two components `{0,2}` and `{1,3}`. Known set is `{0,3}` (0 knows secret, 3 knows because `firstPerson=3`). Component `{0,2}` contains 0 → add 2. Component `{1,3}` contains 3 → add 1. Known becomes `{0,1,2,3}`.
2. **Time 2:** meeting `(2,3)`. Both already know the secret, so no change.
3. End result includes everyone.

---

## Complexity Analysis

- **Time:** O(m log m) for sorting `m` meetings plus near‑linear Union‑Find operations per time group.
- **Space:** O(n + m) for the Union‑Find structure and the known set.

---

## Follow‑Up Questions

1. How would you handle meetings that occur at the same time but form a chain of connections (e.g., `0‑1`, `1‑2` at the same timestamp)?
2. Can the solution be adapted to return the earliest time each person learns the secret?
3. How would you modify the algorithm if meetings could be added dynamically after processing has begun?

---

## Key Takeaway

> **Group meetings by timestamp, use Union‑Find within each group, and propagate the secret only when a component contains a known person. This isolates propagation to the correct time slice and avoids premature sharing.**
