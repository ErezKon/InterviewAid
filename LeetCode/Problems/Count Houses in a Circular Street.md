# 2728. Count Houses in a Circular Street

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-houses-in-a-circular-street](https://leetcode.com/problems/count-houses-in-a-circular-street)
**Companies:** Google

---

## 1. Problem Description

Given a circular street with at most `k` houses and a `Street` API (with `openDoor()`, `closeDoor()`, `isDoorOpen()`, `moveRight()`), count the total number of houses. You start at an arbitrary house.

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

**Example 1:**
```
Input: k = 5, street API initially with all doors closed.
Output: 5
Explanation: After closing all doors, we open one door as a marker and walk right 4 more steps until we encounter the open door again, counting 5 houses.
```

**Example 2:**
```
Input: k = 3, street API with doors in arbitrary open/close state.
Output: 3
Explanation: The algorithm first normalizes the state by closing all doors, then uses a single open door as a marker to count the three houses.
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
