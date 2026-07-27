# 855. Exam Room

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/exam-room](https://leetcode.com/problems/exam-room)
**Companies:** Amazon, Apple, Google, Quora, Samsung, Uber

---

## Approach: Sorted Set — O(n) per seat ✅

```
CLASS ExamRoom:
    CONSTRUCTOR(n):
        self.n = n
        self.students = SortedList()

    FUNCTION seat():
        IF NOT students:
            students.ADD(0)
            RETURN 0

        maxDist = students[0]    // distance from seat 0
        bestSeat = 0

        FOR i ← 0 TO len(students) - 2:
            dist = (students[i+1] - students[i]) / 2
            IF dist > maxDist:
                maxDist = dist
                bestSeat = students[i] + dist

        IF n - 1 - students[-1] > maxDist:
            bestSeat = n - 1

        students.ADD(bestSeat)
        RETURN bestSeat

    FUNCTION leave(p):
        students.REMOVE(p)
```
