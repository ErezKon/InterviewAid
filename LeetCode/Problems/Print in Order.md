# 1114. Print in Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/print-in-order](https://leetcode.com/problems/print-in-order)
**Companies:** Google, Microsoft

---

## Problem Description
Implement a class `Foo` that provides three methods `first()`, `second()`, and `third()`. Three different threads will call these methods, and the methods must ensure that the output occurs in the order `first` → `second` → `third` regardless of the order in which the threads are scheduled.

## Examples
**Example 1**
```
Input: order of calls = [first, second, third]
Output: "firstsecondthird"
```
The threads happen to call the methods in the correct order, so the output is straightforward.

**Example 2**
```
Input: order of calls = [second, first, third]
Output: "firstsecondthird"
```
Even though `second()` is invoked before `first()`, the synchronization forces `first()` to run first.

## Approach
Use two synchronization primitives (e.g., semaphores or condition variables) to enforce ordering:
1. `firstSem` starts released, allowing `first()` to run immediately.
2. `secondSem` and `thirdSem` start blocked.
3. `first()` prints its message and releases `secondSem`.
4. `second()` waits on `secondSem`, prints, then releases `thirdSem`.
5. `third()` waits on `thirdSem` and prints.
The three methods block until the previous stage signals them.

### Pseudocode
```text
CLASS Foo:
    FUNCTION __init__():
        SET self.firstSem ← SEMAPHORE(1)   // allow first() immediately
        SET self.secondSem ← SEMAPHORE(0)
        SET self.thirdSem ← SEMAPHORE(0)

    FUNCTION first(printFirst):
        ACQUIRE self.firstSem
        CALL printFirst()
        RELEASE self.secondSem

    FUNCTION second(printSecond):
        ACQUIRE self.secondSem
        CALL printSecond()
        RELEASE self.thirdSem

    FUNCTION third(printThird):
        ACQUIRE self.thirdSem
        CALL printThird()
```
Each method acquires its semaphore, performs the print, and signals the next stage.

## Walkthrough
For the call order `[second, first, third]`:
1. `second()` blocks on `secondSem` (value 0).
2. `first()` acquires `firstSem`, prints, releases `secondSem`.
3. `second()` now proceeds, prints, releases `thirdSem`.
4. `third()` acquires `thirdSem`, prints.
The final output respects the required order.

## Complexity Analysis
- **Time:** `O(1)` per method call – only semaphore operations and a constant‑time print.
- **Space:** `O(1)` – only three semaphores are stored.

## Follow‑Up Questions
1. How would you implement the same ordering using locks and condition variables?
2. Can the pattern be extended to `k` methods that must execute in a specific sequence?
3. What changes are needed if the methods must return values instead of printing?

## Key Takeaway
Use a chain of semaphores (or condition variables) where each stage releases the next, guaranteeing the prescribed execution order regardless of thread scheduling.
