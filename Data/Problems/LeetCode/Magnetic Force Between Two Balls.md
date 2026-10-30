# 1552. Magnetic Force Between Two Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magnetic-force-between-two-balls](https://leetcode.com/problems/magnetic-force-between-two-balls)
**Companies:** Amazon, Apple, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Roblox, Salesforce, Uber

---

## 1. Problem Description

In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has `n` empty baskets, the `i^th` basket is at `position[i]`, Morty has `m` balls and needs to distribute the balls into the baskets such that the **minimum magnetic force** between any two balls is **maximum**.

Rick stated that magnetic force between two different balls at positions `x` and `y` is `|x - y|`.

Given the integer array `position` and the integer `m`. Return *the required force*.

**Constraints:**

- `n == position.length`
- `2 <= n <= 10^5`
- `1 <= position[i] <= 10^9`
- All integers in `position` are **distinct**.
- `2 <= m <= position.length`

---

## 2. Examples

```
Example 1:
  Input: position = [1,2,3,4,7], m = 3
  Output: 3
  Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.
```

```
Example 2:
  Input: position = [5,4,3,2,1,1000000000], m = 2
  Output: 999999999
  Explanation: We can use baskets 1 and 1000000000.
```

---

## 3. Approach: Binary Search on Answer — O(n log D) ✅

```text
FUNCTION maxDistance(position, m):
    // sort positions to enable greedy placement
    SORT position
    SET lo ← 1
    SET hi ← position[-1] - position[0]
    WHILE lo ≤ hi:
        SET mid ← (lo + hi) / 2
        IF canPlace(position, m, mid):
            SET lo ← mid + 1          // try larger distance
        ELSE:
            SET hi ← mid - 1          // distance too large
    RETURN hi

FUNCTION canPlace(position, m, minDist):
    SET count ← 1
    SET lastPos ← position[0]
    FOR pos IN position[1:]:
        IF pos - lastPos ≥ minDist:
            SET count ← count + 1
            SET lastPos ← pos
    RETURN count ≥ m
```

---

## 4. Walkthrough

Consider `position = [1,2,3,4,7]`, `m = 3`:

1. **Sort** → `[1,2,3,4,7]`.
2. **Binary search range**: `lo = 1`, `hi = 6`.
3. `mid = 3` → `canPlace` succeeds (places at `1`, `4`, `7`).
4. Increase `lo` to `4`.
5. `mid = 5` → `canPlace` fails (cannot place 3 balls with distance ≥5).
6. Decrease `hi` to `4`.
7. `mid = 4` → `canPlace` fails.
8. End loop, return `hi = 3`.

The optimal minimum distance is `3`.

---

## 5. Complexity Analysis

- **Time:** O(n log D) – sorting O(n log n) dominates, plus binary search with O(n) greedy check each iteration.
- **Space:** O(1) extra – only a few variables besides the input array.

---

## 6. Follow-Up Questions

- How would the solution change if the positions were given in a stream?
- Can you adapt the algorithm to return the actual placement of the balls?

---

## 7. Key Takeaway

> "Maximize the minimum" → binary search on the answer. Greedy check: place balls left to right, skipping positions too close. Classic binary search on answer pattern.
