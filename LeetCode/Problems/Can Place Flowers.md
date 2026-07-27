# 605. Can Place Flowers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/can-place-flowers](https://leetcode.com/problems/can-place-flowers)
**Companies:** Airbnb, Amazon, Apple, Atlassian, Bloomberg, Cisco, Google, Htc, Linkedin, Meta, Microsoft, Nike, Nutanix, Oracle, Soti, Yandex

---

## Approach: Greedy — O(n) ✅

```
FUNCTION canPlaceFlowers(flowerbed, n):
    FOR i ← 0 TO len(flowerbed) - 1:
        IF flowerbed[i] == 0:
            leftEmpty = (i == 0 OR flowerbed[i-1] == 0)
            rightEmpty = (i == len(flowerbed)-1 OR flowerbed[i+1] == 0)
            IF leftEmpty AND rightEmpty:
                flowerbed[i] = 1
                n -= 1
    RETURN n <= 0
```

Greedily plant whenever possible. If both neighbors are empty (or boundary), plant.
