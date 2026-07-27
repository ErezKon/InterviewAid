# 1354. Construct Target Array With Multiple Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/construct-target-array-with-multiple-sums](https://leetcode.com/problems/construct-target-array-with-multiple-sums)
**Companies:** Quora

---

## 1. Problem Description

Given a target array, determine if you can build it starting from an array of all 1s. In each step, you replace one element with the sum of the entire array.

---

## 2. Key Insight

> Work backwards: the largest element was the last to be replaced. Its previous value = `largest - (total - largest)`. Use a max-heap to always process the largest. Use modulo to skip repeated subtractions when the largest is much bigger than the rest.

---

## 3. Approach: Reverse Simulation with Max-Heap — O(n log n log max) ✅

```
FUNCTION isPossible(target):
    IF len(target) == 1: RETURN target[0] == 1
    total = SUM(target)
    heap = max-heap of target
    
    WHILE heap.top > 1:
        largest = heap.pop()
        rest = total - largest
        IF rest == 0 OR rest >= largest: RETURN false
        IF rest == 1: RETURN true
        prev = largest % rest
        IF prev == 0: prev = rest  // would become 0, use rest instead
        IF prev >= largest: RETURN false
        heap.push(prev)
        total = rest + prev
    
    RETURN true
```

| Time | Space |
|------|-------|
| O(n log n log max) | O(n) |

---

## Key Takeaway

> Reverse the process: the largest element reveals the previous state. Modulo skips redundant steps when one element dominates the sum. Handle edge cases (rest=1, rest=0) carefully.
