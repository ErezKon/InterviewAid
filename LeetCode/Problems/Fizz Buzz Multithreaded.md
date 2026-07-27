# 1195. Fizz Buzz Multithreaded

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fizz-buzz-multithreaded](https://leetcode.com/problems/fizz-buzz-multithreaded)
**Companies:** Gartner, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Condition Variables / Semaphores ✅](#3-approach-condition-variables--semaphores-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Implement FizzBuzz with 4 threads: one prints numbers, one prints "Fizz", one prints "Buzz", one prints "FizzBuzz". Each thread should only execute for its matching condition.

---

## 2. Key Insight

> Use a shared counter protected by a lock/condition. Each thread waits until the counter matches its condition, then acts and increments the counter.

---

## 3. Approach: Condition Variables / Semaphores ✅

```
CLASS FizzBuzz:
    // Use synchronization primitives (semaphores/locks/barriers)
    // 4 threads: fizz, buzz, fizzbuzz, number
    // Each thread checks condition and prints/calls appropriate function
    // Use a shared counter with condition variables

    CONSTRUCTOR(n):
        self.n ← n; self.current ← 1
        self.lock ← Lock(); self.cond ← Condition(lock)

    FUNCTION fizz/buzz/fizzbuzz/number(printFn):
        WHILE current <= n:
            WITH cond:
                WHILE current <= n AND NOT myCondition(current):
                    cond.WAIT()
                IF current <= n: printFn()
                current += 1
                cond.NOTIFY_ALL()
```

---

## 4. Key Takeaway

> **Condition variables** with `notify_all()` let each thread wake up, check its condition, act if matched, and re-notify others. Classic concurrency pattern.
