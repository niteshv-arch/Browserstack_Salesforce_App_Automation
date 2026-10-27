class NotificationsPage {
  get emptySummary() { return $('id=com.salesforce.chatter:id/notification_empty_summary'); }
}

module.exports = new NotificationsPage();
