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

```
FUNCTION houseCount(street, k):
    // Phase 1: Close all doors (at most k houses)
    FOR i FROM 0 TO k-1:
        street.closeDoor()
        street.moveRight()
    
    // Phase 2: Open current door as marker
    street.openDoor()
    street.moveRight()
    count = 1
    
    WHILE NOT street.isDoorOpen():
        street.moveRight()
        count += 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(k) | O(1) |

---

## Key Takeaway

> To count in a circular structure without knowing the size: reset all markers, place one marker, then walk until you find it again.
