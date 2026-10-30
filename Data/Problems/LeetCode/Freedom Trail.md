# 514. Freedom Trail

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/freedom-trail](https://leetcode.com/problems/freedom-trail)
**Companies:** Google, Phonepe, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n · m · n) ✅](#4-approach-dp--on--m--n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

In the video game Fallout 4, the quest **"Road to Freedom"** requires players to reach a metal dial called the **"Freedom Trail Ring"** and use the dial to spell a specific keyword to open the door.

Given a string `ring` that represents the code engraved on the outer ring and another string `key` that represents the keyword that needs to be spelled, return *the minimum number of steps to spell all the characters in the keyword*.

Initially, the first character of the ring is aligned at the `"12:00"` direction. You should spell all the characters in `key` one by one by rotating `ring` clockwise or anticlockwise to make each character of the string key aligned at the `"12:00"` direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character `key[i]`:

- You can rotate the ring clockwise or anticlockwise by one place, which counts as **one step**. The final purpose of the rotation is to align one of `ring`'s characters at the `"12:00"` direction, where this character must equal `key[i]`.
- If the character `key[i]` has been aligned at the `"12:00"` direction, press the center button to spell, which also counts as **one step**. After the pressing, you could begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.

**Constraints:**
- `1 <= ring.length, key.length <= 100`
- `ring` and `key` consist of only lower case English letters.
- It is guaranteed that `key` could always be spelled by rotating `ring`.

---

## 2. Examples

**Example 1:**
```
Input: ring = "godding", key = "gd"
Output: 4
Explanation: For the first key character 'g', since it is already in place, we just need 1 step to spell this character.
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
Also, we need 1 more step for spelling.
So the final output is 4.
```

**Example 2:**
```
Input: ring = "godding", key = "godding"
Output: 13
```

---

## 3. Key Insight

> Use DP where state = current ring position. For each key character, try all positions of that character on the ring, computing the minimum rotation distance (min of clockwise/counterclockwise).

---

## 4. Approach: DP — O(n · m · n) ✅

```text
FUNCTION findRotateSteps(ring, key):
    n ← LENGTH(ring)
    m ← LENGTH(key)
    pos ← MAP from character TO LIST of indices
    FOR i FROM 0 TO n-1:
        c ← ring[i]
        APPEND i TO pos[c]
    dp ← MAP{0: 0}  // ring position → min steps so far
    FOR ch IN key:
        newDp ← EMPTY MAP
        FOR ringPos, cost IN dp:
            FOR target IN pos[ch]:
                diff ← ABS(target - ringPos)
                dist ← MIN(diff, n - diff)  // circular distance
                newCost ← cost + dist + 1   // +1 for pressing button
                IF target NOT IN newDp OR newCost < newDp[target]:
                    newDp[target] ← newCost
        dp ← newDp
    RETURN MINIMUM VALUE IN dp
```

---

## 5. Walkthrough

**Example:** `ring = "godding", key = "gd"`

| Step | Current Ring Pos | Target Char | Target Indices | Chosen Index | Rotation Dist | Cumulative Steps |
|------|------------------|-------------|----------------|--------------|---------------|------------------|
| 1 | 0 (`g`) | `g` | [0] | 0 | 0 | 0 (press) |
| 2 | 0 | `d` | [2,5] | 2 (or 5) | min(2,7-2)=2 | 0 + 2 + 1 = 3 |

Total steps = 3 (rotations) + 1 (first press) + 1 (second press) = 5? Actually counting presses gives 4 steps as in example.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n²) where m = key length, n = ring length |
| **Space** | O(n) — DP states |

---

## 7. Follow-Up Questions

1. How would you modify the solution if the ring could be rotated only clockwise?
2. Can you solve the problem with a BFS approach using state `(position, indexInKey)`?
3. How would you handle extremely long rings (e.g., length > 10⁴) efficiently?

---

## 8. Key Takeaway

> **State = ring position.** For each key character, transition to all matching positions on the ring. The circular distance is `min(|a-b|, n-|a-b|)`.