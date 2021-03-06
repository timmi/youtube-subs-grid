$(document).ready(function(){
	YTG.platform.getStorageItem('watchHistory', function(data)
	{
		YTG.history.setHistory(data.watchHistory);

		// Record all links leading to videos.
		$('#page').on('click', '[data-context-item-type="video"] a', YTG.history.addToHistoryHandler);
		
		// Is this a video watch page? Make sure we store that in the history
		// in case the user came from an external source.
		if ($('meta[itemprop="videoId"]').length)
		{
			YTG.history.addToHistory($('meta[itemprop="videoId"]').attr('content'));
		}

		// Are we on the subs page?
		if (window.location.href.indexOf('/feed/subscriptions') !== -1)
		{
			// selector fun - yolo
			$('#page').on('click', '.ytg-mark-watched:not(.watched .ytg-mark-watched)', YTG.history.toggleWatchedHandler);

			YTG.platform.getStorageItem('hideVideos', function(data)
			{
				YTG.subscriptions.setHideVideos(data.hideVideos);
				YTG.subscriptions.setup();
			});

			/* CSS fix for the subs page */
			$('.branded-page-v2-primary-col').addClass('clearfix');
		}
	});
});