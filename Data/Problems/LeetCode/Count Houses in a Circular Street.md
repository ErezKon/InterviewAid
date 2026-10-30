# 2728. Count Houses in a Circular Street

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-houses-in-a-circular-street](https://leetcode.com/problems/count-houses-in-a-circular-street)
**Companies:** Google

---

## 1. Problem Description

You are given an object `street` of class `Street` that represents a circular street and a positive integer `k` which represents a maximum bound for the number of houses in that street (in other words, the number of houses is less than or equal to `k`). Houses' doors could be open or closed initially.

Initially, you are standing in front of a door to a house on this street. Your task is to count the number of houses in the street.

The class `Street` contains the following functions which may help you:

- `void openDoor()`: Open the door of the house you are in front of.
- `void closeDoor()`: Close the door of the house you are in front of.
- `boolean isDoorOpen()`: Returns `true` if the door of the current house is open and `false` otherwise.
- `void moveRight()`: Move to the right house.
- `void moveLeft()`: Move to the left house.

Return `ans` *which represents the number of houses on this street.*

**Constraints:**
- `n == number of houses`
- `1 <= n <= k <= 10^3`

---

## 2. Key Insight

> Close all doors first by traversing `k` steps. Then open the current door and walk right, counting steps until you see the open door again.

---

## 3. Approach: Mark and Walk — O(k) ✅

```text
FUNCTION houseCount(street, k):
    // Phase 1: Close all doors (at most k houses)
    FOR i FROM 0 TO k-1:
        street.closeDoor()
        street.moveRight()
    
    // Phase 2: Open current door as marker
    street.openDoor()
    street.moveRight()
    count ← 1
    
    WHILE NOT street.isDoorOpen():
        street.moveRight()
        count ← count + 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(k) | O(1) |

---

## Examples

```
Example 1:
  Input: street = [0,0,0,0], k = 10
  Output: 4
  Explanation: There are 4 houses, and all their doors are closed.
  The number of houses is less than k, which is 10.
```

```
Example 2:
  Input: street = [1,0,1,1,0], k = 5
  Output: 5
  Explanation: There are 5 houses, and the doors of the 1st, 3rd, and 4th house (moving in the right direction) are open, and the rest are closed.
  The number of houses is equal to k, which is 5.
```

---

## Walkthrough

| Step | Action | `street.isDoorOpen()` | `count` |
|------|--------|-----------------------|---------|
| 1 | Close all doors while moving right `k` times | false (all closed) | 0 |
| 2 | Open current door (marker) and move right | true (marker opened) | 1 |
| 3 | Loop: move right until `isDoorOpen()` returns true again | false → true after `k-1` moves | increments each move |
| 4 | Exit loop, `count` equals number of houses (`k`). |

---

## Complexity Analysis

- **Time:** The algorithm makes at most `2k` API calls → **O(k)**.
- **Space:** Only a few integer variables are used → **O(1)**.

---

## Follow-Up Questions

1. How would you modify the solution if the street could contain more than `k` houses but you only know an upper bound?
2. Can the algorithm be adapted to work when the API only provides `moveLeft()` instead of `moveRight()`?
3. What if the doors could be in an unknown state and you cannot close all of them initially?

---

## Key Takeaway

> To count in a circular structure without knowing the size: reset all markers, place one marker, then walk until you find it again.
