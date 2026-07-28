# 1503. Last Moment Before All Ants Fall Out of a Plank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank](https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank)
**Companies:** Google

---

## 1. Problem Description

Ants walk on a plank of length `n`. Each ant moves left or right at speed 1. When two ants meet they instantly reverse direction. Return the last moment when any ant is still on the plank.

---

## 2. Examples

**Example 1:**
```
n = 5
left = [4, 3]
right = [2]
```
**Output:** 4
**Explanation:** Ants at positions 4 and 3 move left, reaching the left end at times 4 and 3. The ant moving right from position 2 reaches the right end at time 3 (distance 5‑2). The latest exit is at time 4.

**Example 2:**
```
n = 6
left = []
right = [0, 1, 2]
```
**Output:** 6
**Explanation:** All ants move right. The farthest ant starts at position 0 and needs 6 seconds to reach the right end.

---

## 3. Approach — Greedy / Math ✅

The collision‑and‑reverse behavior is equivalent to ants passing through each other without interaction. Therefore each ant independently travels to the nearest end:
- A left‑moving ant exits after `position` seconds.
- A right‑moving ant exits after `n - position` seconds.
The answer is the maximum of all these times.

```text
FUNCTION getLastMoment(n, left, right):
    maxLeft ← IF left IS NOT EMPTY THEN MAX(left) ELSE 0
    maxRight ← IF right IS NOT EMPTY THEN MAX(MAP(x → n - x, right)) ELSE 0
    RETURN MAX(maxLeft, maxRight)
```

---

## 4. Walkthrough

| Ant | Direction | Start | Time to Exit |
|-----|-----------|-------|--------------|
| A1  | left      | 4     | 4            |
| A2  | left      | 3     | 3            |
| A3  | right     | 2     | 5 (n‑2)      |

The maximum time is **5**, which is the last moment any ant remains on the plank.

---

## 5. Complexity Analysis

- **Time:** O(L + R) where L = `len(left)`, R = `len(right)` – just scanning the two arrays.
- **Space:** O(1) – only a few scalar variables.

---

## 6. Follow-Up Questions

1. How would the solution change if ants could change direction arbitrarily (not only on collision)?
2. What if the plank is circular, allowing ants to wrap around?
3. Can you extend the approach to report which ant exits last?

---

## Key Takeaway

> Collisions are irrelevant; treat ants as passing through each other. The answer is simply the farthest distance any ant must travel to reach an end.
