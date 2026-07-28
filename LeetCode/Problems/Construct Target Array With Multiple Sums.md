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

```text
FUNCTION isPossible(target):
    IF LENGTH(target) = 1:
        RETURN target[0] = 1
    total ← SUM(target)
    heap ← MAX-HEAP(target)
    
    WHILE heap.peek() > 1:
        largest ← heap.pop()
        rest ← total - largest
        IF rest = 0 OR rest ≥ largest:
            RETURN false
        IF rest = 1:
            RETURN true
        prev ← largest MOD rest
        IF prev = 0:
            prev ← rest
        IF prev ≥ largest:
            RETURN false
        heap.push(prev)
        total ← rest + prev
    
    RETURN true
```

---

## 4. Examples

| target | Output | Explanation |
|--------|--------|-------------|
| [9,3,5] | true | Start from [1,1,1] → sum=3, replace index0 → [3,1,1] → sum=5, replace index2 → [3,1,5] → sum=9, replace index0 → [9,1,5] → sum=15, replace index1 → [9,15,5] ... eventually reaches [9,3,5]. |
| [1,1,1,2] | true | Simple case where only one element grows.
| [8,5] | false | No sequence of replacements can produce this configuration.

---

## 5. Walkthrough

Consider `target = [9,3,5]`.

1. **Initial state**: total = 17, max‑heap = {9,5,3}.
2. Pop largest = 9, rest = 8.
   - `prev = 9 % 8 = 1` (previous value of that element).
   - Push 1 back, new total = 8 + 1 = 9, heap = {5,3,1}.
3. Pop largest = 5, rest = 4.
   - `prev = 5 % 4 = 1`.
   - Push 1, total = 4 + 1 = 5, heap = {3,1,1}.
4. Pop largest = 3, rest = 2.
   - `prev = 3 % 2 = 1`.
   - Push 1, total = 2 + 1 = 3, heap = {1,1,1}.
5. All elements are 1 → reachable, return **true**.

---

## 6. Complexity Analysis

- **Time:** O(n log n log M) where *n* is the array length and *M* is the maximum element (due to repeated modulo operations).
- **Space:** O(n) for the max‑heap.

---

## 7. Follow-Up Questions

- How would the algorithm change if you could replace any element with the product of the array instead of the sum?
- Can you adapt the solution to also return the sequence of operations that constructs the target?
- What is the complexity if the array size is extremely large (e.g., 10⁵) but values are bounded?

---

## Key Takeaway

> Reverse the process: the largest element reveals the previous state. Modulo skips redundant steps when one element dominates the sum. Handle edge cases (rest=1, rest=0) carefully.
