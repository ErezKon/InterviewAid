# 379. Design Phone Directory

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-phone-directory](https://leetcode.com/problems/design-phone-directory)
**Companies:** Google

---

## Problem Description

Design a phone directory that initially has `maxNumbers` empty slots that can store numbers. The directory should store numbers, check if a certain slot is empty or not, and empty a given slot.

Implement the `PhoneDirectory` class:

- `PhoneDirectory(int maxNumbers)` Initializes the phone directory with the number of available slots `maxNumbers`.
- `int get()` Provides a number that is not assigned to anyone. Returns `-1` if no number is available.
- `bool check(int number)` Returns `true` if the slot `number` is available and `false` otherwise.
- `void release(int number)` Recycles or releases the slot `number`.

**Constraints:**
- `1 <= maxNumbers <= 10^4`
- `0 <= number < maxNumbers`
- At most `2 * 10^4` calls will be made to `get`, `check`, and `release`.

---

## Examples

```
Example 1:
  Input:
  ["PhoneDirectory", "get", "get", "check", "get", "check", "release", "check"]
  [[3], [], [], [2], [], [2], [2], [2]]
  Output:
  [null, 0, 1, true, 2, false, null, true]
  Explanation:
  PhoneDirectory phoneDirectory = new PhoneDirectory(3);
  phoneDirectory.get();      // It can return any available phone number. Here we assume it returns 0.
  phoneDirectory.get();      // Assume it returns 1.
  phoneDirectory.check(2);   // The number 2 is available, so return true.
  phoneDirectory.get();      // It returns 2, the only number that is left.
  phoneDirectory.check(2);   // The number 2 is no longer available, so return false.
  phoneDirectory.release(2); // Release number 2 back to the pool.
  phoneDirectory.check(2);   // Number 2 is available again, return true.
```

---

## Walkthrough

1. Initialize with `maxNumbers = 3` → available numbers = {0,1,2}.
2. First `get()` pops `0` from the queue, removes from set, returns `0`.
3. Second `get()` pops `1`, returns `1`.
4. `check(2)` looks up `2` in the set → `true`.
5. `release(1)` adds `1` back to both queue and set.
6. `check(1)` now finds `1` in the set → `true`.

The queue maintains allocation order, while the set enables O(1) existence checks and prevents double‑release.

---

## Approach

```
CLASS PhoneDirectory:
    CONSTRUCTOR(maxNumbers):
        available = deque(range(maxNumbers))
        availableSet = SET(range(maxNumbers))

    FUNCTION get():
        IF NOT available: RETURN -1
        num = available.POPLEFT()
        availableSet.REMOVE(num)
        RETURN num

    FUNCTION check(number):
        RETURN number IN availableSet

    FUNCTION release(number):
        IF number NOT IN availableSet:
            availableSet.ADD(number)
            available.APPEND(number)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) all operations |
| **Space** | O(maxNumbers) |

---

## Follow-Up Questions

- How would you modify the design to support allocating the smallest available number?
- How could you make `get()` return a random free number efficiently?
- What changes are needed to persist the directory across process restarts?

---

## Key Takeaway

> **Queue + set combo: queue gives O(1) allocation order, set gives O(1) availability checks and prevents double-release. Classic free-list design.**