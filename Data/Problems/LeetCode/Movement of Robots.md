# 2731. Movement of Robots

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/movement-of-robots](https://leetcode.com/problems/movement-of-robots)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort Final Positions — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Some robots are standing on an infinite number line with their initial coordinates given by a **0-indexed** integer array `nums` and will start moving once given the command to move. The robots will move a unit distance each second.

You are given a string `s` denoting the direction in which robots will move on command. `'L'` means the robot will move towards the left side or negative side of the number line, whereas `'R'` means the robot will move towards the right side or positive side of the number line.

If two robots collide, they will start moving in opposite directions.

Return *the sum of distances between all the pairs of robots* `d` *seconds after the command.* Since the sum can be very large, return it modulo `10⁹ + 7`.

**Note:**

- For two robots at the index `i` and `j`, pair `(i,j)` and pair `(j,i)` are considered the same pair.
- When robots collide, they **instantly change** their directions without wasting any time.
- Collision happens when two robots share the same place in a moment.
  - For example, if a robot is positioned in 0 going to the right and another is positioned in 2 going to the left, the next second they'll be both in 1 and they will change direction and the next second the first one will be in 0, heading left, and another will be in 2, heading right.
  - For example, if a robot is positioned in 0 going to the right and another is positioned in 1 going to the left, the next second the first one will be in 0, heading left, and another will be in 1, heading right.

**Constraints:**
- `2 <= nums.length <= 10⁵`
- `-2 * 10⁹ <= nums[i] <= 2 * 10⁹`
- `0 <= d <= 10⁹`
- `nums.length == s.length`
- `s` consists of `'L'` and `'R'` only
- `nums[i]` will be unique.

---

## 2. Key Insight

> **Collision = pass-through.** When two robots collide and swap, it is equivalent to them passing through each other. So each robot's final position = `pos[i] ± d` regardless of collisions. Sort final positions, then compute pairwise distances using prefix sums.

---

## 3. Approach: Sort + Prefix Sum — O(n log n) ✅

```text
FUNCTION sumDistance(nums, s, d):
    MOD ← 10^9 + 7
    // Compute final positions
    FOR i ← 0 TO n - 1:
        IF s[i] == 'R':
            SET nums[i] ← nums[i] + d
        ELSE:
            SET nums[i] ← nums[i] - d
    SORT nums
    // Sum of pairwise distances using prefix sums
    SET ans ← 0
    SET prefix ← 0
    FOR i ← 0 TO n - 1:
        SET ans ← (ans + nums[i] * i - prefix) MOD MOD
        SET prefix ← prefix + nums[i]
    RETURN ans
```

---

## 4. Examples

```
Example 1:
  Input: nums = [-2,0,2], s = "RLL", d = 3
  Output: 8
  Explanation:
  After 1 second, the positions are [-1,-1,1]. Now, the robot at index 0 will move left, and the robot at index 1 will move right.
  After 2 seconds, the positions are [-2,0,0]. Now, the robot at index 1 will move left, and the robot at index 2 will move right.
  After 3 seconds, the positions are [-3,-1,1].
  The distance between the robot at index 0 and 1 is abs(-3 - (-1)) = 2.
  The distance between the robot at index 0 and 2 is abs(-3 - 1) = 4.
  The distance between the robot at index 1 and 2 is abs(-1 - 1) = 2.
  The sum of the pairs of all distances = 2 + 4 + 2 = 8.
```

```
Example 2:
  Input: nums = [1,0], s = "RL", d = 2
  Output: 5
  Explanation:
  After 1 second, the positions are [2,-1].
  After 2 seconds, the positions are [3,-2].
  The distance between the two robots is abs(-2 - 3) = 5.
```

---

## 5. Walkthrough

Take **Example 1**:
| Step | Action |
|------|--------|
| 1 | Compute final positions: 1→3, 3→5, 6→4 (using `+d` for `R`, `-d` for `L`). |
| 2 | Sort positions → `[3,4,5]`. |
| 3 | Prefix sum iteration: <br>• i=0: ans=0, prefix=3 <br>• i=1: ans=`4*1-3`=1, prefix=7 <br>• i=2: ans+=`5*2-7`=3 → total ans=4. |
| 4 | Multiply by 2 for ordered pairs → 8, return modulo `10⁹+7`. |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting the final positions |
| **Space** | O(1) extra (in-place sort) |

---

## 7. Follow-Up Questions

- How would the solution change if robots could have different speeds?
- Can you solve the problem in O(n) time without sorting?
- What if the line were circular (positions wrap around)?

---

## 8. Key Takeaway

> **Colliding robots = passing through.** Ignore collisions, compute final positions, sort, and use the prefix-sum trick to obtain all pairwise distances efficiently.
