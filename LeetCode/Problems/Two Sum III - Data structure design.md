# 170. Two Sum III - Data structure design

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Linkedin
---

```
CLASS TwoSum:
    CONSTRUCTOR: self.nums = Counter()
    FUNCTION add(number): nums[number] += 1
    FUNCTION find(value):
        FOR num IN nums:
            comp = value - num
            IF comp != num AND comp IN nums: RETURN true
            IF comp == num AND nums[num] > 1: RETURN true
        RETURN false
```
