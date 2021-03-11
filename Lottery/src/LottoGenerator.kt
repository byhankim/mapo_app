package kr.co.kotlin

import java.util.*
import kotlin.random.Random

fun main(args: Array<String>) {
    var count = Scanner(System.`in`).nextInt()
    if (count < 1 || count > 5) {
        println("최소 게임 횟수는 1회, 최대 횟수는 5회 입니다. 3회로 강제 조정합니다.")
        count = 3
    }

//    val totalGames = mutableListOf<Set<Int>>()
    for (i in 1..count) {
        val lottery = mutableSetOf<Int>()
        while (lottery.size < 7) {
            lottery.add(Random.nextInt(45)+1)
        }
        println("$i 번째 게임: ${lottery}")// .sorted()}")
//        totalGames.add(lottery)
    }
}