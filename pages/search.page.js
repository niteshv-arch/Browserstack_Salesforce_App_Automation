class SearchPage {
  get searchInput() { return $('id=com.salesforce.chatter:id/search_src_text'); }
  get clearQueryButton() { return $('~Clear query'); }
  get askButton() { return $('id=com.salesforce.chatter:id/ask_entry_pill'); }
  get resultRows() { return $$('id=com.salesforce.chatter:id/find_object_row'); }
  get resultNames() { return $$('id=com.salesforce.chatter:id/record_name'); }

  async search(term) {
    await this.searchInput.waitForDisplayed({ timeout: 15000 });
    await this.searchInput.setValue(term);
  }
}

module.exports = new SearchPage();
