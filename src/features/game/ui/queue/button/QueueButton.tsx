"use client";

import styles from "./QueueButton.module.css";

import React from "react";
import { addPlayerToQueue } from "../../../model";

export function QueueButton() {
    return <button className={styles['btn']} onClick={() => addPlayerToQueue()}>Начать поиск</button>;
}
