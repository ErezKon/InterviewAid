# 1670. Design Front Middle Back Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-front-middle-back-queue](https://leetcode.com/problems/design-front-middle-back-queue)
**Companies:** Amazon, Citadel

---

## Problem Description

Design a queue that supports `push` and `pop` operations in the front, middle, and back.

Implement the `FrontMiddleBack` class:

- `FrontMiddleBack()` Initializes the queue.
- `void pushFront(int val)` Adds `val` to the **front** of the queue.
- `void pushMiddle(int val)` Adds `val` to the **middle** of the queue.
- `void pushBack(int val)` Adds `val` to the **back** of the queue.
- `int popFront()` Removes the **front** element of the queue and returns it. If the queue is empty, return `-1`.
- `int popMiddle()` Removes the **middle** element of the queue and returns it. If the queue is empty, return `-1`.
- `int popBack()` Removes the **back** element of the queue and returns it. If the queue is empty, return `-1`.

**Notice** that when there are **two** middle position choices, the operation is performed on the **frontmost** middle position choice. For example:

- Pushing `6` into the middle of `[1, 2, 3, 4, 5]` results in `[1, 2, 6, 3, 4, 5]`.
- Popping the middle from `[1, 2, 3, 4, 5, 6]` returns `3` and results in `[1, 2, 4, 5, 6]`.

**Constraints:**

- `1 <= val <= 10^9`
- At most `1000` calls will be made to `pushFront`, `pushMiddle`, `pushBack`, `popFront`, `popMiddle`, and `popBack`.

---

## Approach

```text
CLASS FrontMiddleBackQueue:
    // Two deques: first half and second half
    // Maintain: len(first) == len(second) or len(first) == len(second) - 1
    first = deque()
    second = deque()

    FUNCTION balance():
        IF len(first) > len(second):
            second.appendleft(first.pop())
        IF len(second) > len(first) + 1:
            first.append(second.popleft())

    FUNCTION pushFront(val): first.appendleft(val); balance()
    FUNCTION pushMiddle(val): first.append(val); balance()
    FUNCTION pushBack(val): second.append(val); balance()
    FUNCTION popFront():
        IF NOT first AND NOT second: RETURN -1
        IF first:
            val ← first.popleft()
        ELSE:
            val ← second.popleft()
        balance()
        RETURN val
    FUNCTION popMiddle():
        IF NOT first AND NOT second: RETURN -1
        IF len(first) == len(second):
            val ← first.pop()
        ELSE:
            val ← second.popleft()
        balance()
        RETURN val
    FUNCTION popBack():
        IF NOT second AND NOT first: RETURN -1
        IF second:
            val ← second.pop()
        ELSE:
            val ← first.pop()
        balance()
        RETURN val
```

---

## Examples

```
Example 1:
  Input:
  ["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
  [[], [1], [2], [3], [4], [], [], [], [], []]
  Output:
  [null, null, null, null, null, 1, 3, 4, 2, -1]
  Explanation:
  FrontMiddleBackQueue q = new FrontMiddleBackQueue();
  q.pushFront(1);   // [1]
  q.pushBack(2);    // [1, 2]
  q.pushMiddle(3);  // [1, 3, 2]
  q.pushMiddle(4);  // [1, 4, 3, 2]
  q.popFront();     // return 1 -> [4, 3, 2]
  q.popMiddle();    // return 3 -> [4, 2]
  q.popMiddle();    // return 4 -> [2]
  q.popBack();      // return 2 -> []
  q.popFront();     // return -1 -> [] (The queue is empty)
```

---

## Walkthrough

1. **pushFront(1)** – `first` becomes `[1]`, `second` empty. Balance moves nothing.
2. **pushBack(2)** – `second` becomes `[2]`. Lengths equal, invariant holds.
3. **pushMiddle(3)** – `first.append(3)` → `first` `[1,3]`. Now `len(first)=2`, `len(second)=1`; `balance()` moves last of `first` (`3`) to front of `second`, resulting `first` `[1]`, `second` `[3,2]`.
4. **popFront()** – removes `1` from `first`. After removal `first` empty, `balance()` moves one element from `second` to `first` to keep invariant: `first` `[3]`, `second` `[2]`.
5. **popMiddle()** – lengths equal, so middle is end of `first`; removes `3`. Balance moves `2` to `first`.
6. **popBack()** – removes `2` from `second` (now empty). Queue is empty.

---

## Complexity Analysis

- **Time:** Each operation (`push*`, `pop*`) does O(1) deque operations plus at most one `balance` step, so O(1) amortized.
- **Space:** Stores all elements across two deques, O(n) where n is number of elements.

---

## Key Takeaway

> **Two deques split at the middle with a balance invariant. All push/pop operations are O(1) amortized. Rebalance after each operation to keep halves aligned.**
